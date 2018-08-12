package com.test.driveDemo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class DriveAnalysis {
	
	private Map<String, Gps> drivingCache = new ConcurrentHashMap<String, Gps>();
	
	private Map<String, Integer> hasPreDataCache = new ConcurrentHashMap<String, Integer>();//null没有待处理数据   1有待处理数据
	
	private static final int DRIVING_STATUS = 1;//行车状态
	private static final int NON_DRIVING_STATUS = 0;//非行车状态
	private static final int ABNORMAL_STATUS = -1;//异常数据
	private static final int HAS_PRE_DATA = 1;//有待确认数据
	private static final int SPEED_ZERO = 0;//km/h
	private static final int SPEED_DRIVING = 7;//km/h
	private static final int TRUCK_SPEED_LIMIT = 150;//km/h
	private static final int DRIVING_CACHE_TIME = 30 * 60;//行车缓冲时间  秒
	private static final int NONE_DRIVING_CACHE_TIME = 5 * 60;//非行车缓冲时间  秒

	public void analysis(Gps gps,IDrivingAnalysisCallback analysisCallback){
		if(gps.getSpeed() >= TRUCK_SPEED_LIMIT){//异常数据
			gps.setStatus(ABNORMAL_STATUS);
			analysisCallback.addAbnormalData2DB(gps);
			return;
		}
		Gps drivingCacheGps = drivingCache.get(gps.getVehicleId());
		//判断当前是否正在开车
		if(drivingCacheGps == null || drivingCacheGps.getStatus() == null || 
				(drivingCacheGps.getStatus() != null && drivingCacheGps.getStatus() == NON_DRIVING_STATUS)){//没有开车
			if(gps.getSpeed() == SPEED_ZERO){//车速为0
				if(hasPreDataCache.get(gps.getVehicleId()) == null){//没有待处理数据
					analysisCallback.addDrivingData2DB(gps,NON_DRIVING_STATUS);//新增数据到已确认数据库，数据为非行车数据
				}else{
					analysisCallback.addDrivingData2PreDB(gps);//新增数据到待确认数据库
					analysisCallback.movePreDB2DB(gps.getVehicleId(), NON_DRIVING_STATUS);//迁移到已确认数据库，数据标识为非行车数据
					hasPreDataCache.remove(gps.getVehicleId());//待确认数据为没有数据
				}
				drivingCache.remove(gps.getVehicleId());//清除缓存GPS信息
			}else if(gps.getSpeed() <= SPEED_DRIVING){
				if(drivingCacheGps == null){//缓存为空
					drivingCache.put(gps.getVehicleId(), gps);//缓存该gps点信息
					analysisCallback.addDrivingData2PreDB(gps);//新增数据到待确认数据库
					hasPreDataCache.put(gps.getVehicleId(), HAS_PRE_DATA);//待确认数据为有数据
				}else{//缓存不为空
					if((gps.getDate().getTime() - drivingCacheGps.getDate().getTime())/1000 >= NONE_DRIVING_CACHE_TIME){//与缓存中存入的GPS点信息比较，时长是否>=5分钟
						analysisCallback.addDrivingData2PreDB(gps);//新增数据到待确认数据库
						analysisCallback.movePreDB2DB(gps.getVehicleId(), NON_DRIVING_STATUS);//迁移到已确认数据库，数据标识为非行车数据
						drivingCache.remove(gps.getVehicleId());//清除缓存GPS信息
						hasPreDataCache.remove(gps.getVehicleId());//待确认数据为没有数据
					}else{//存入待确认数据库，同时更新缓存为有待确认数据
						analysisCallback.addDrivingData2PreDB(gps);//新增数据到待确认数据库
						hasPreDataCache.put(gps.getVehicleId(), HAS_PRE_DATA);//待确认数据为有数据
					}
				}
			}else{
				if(hasPreDataCache.get(gps.getVehicleId()) != null){//缓存中有待确认数据
					analysisCallback.addDrivingData2PreDB(gps);//新增数据到待确认数据库
					analysisCallback.movePreDB2DB(gps.getVehicleId(), DRIVING_STATUS);//迁移到已确认数据库，数据标识为行车数据
				}else{
					analysisCallback.addDrivingData2DB(gps,DRIVING_STATUS);//新增数据到已确认数据库，数据为行车数据
				}
				gps.setStatus(DRIVING_STATUS);//设置为正在开车
				drivingCache.put(gps.getVehicleId(), gps);//将gps信息存入缓存
				hasPreDataCache.remove(gps.getVehicleId());//待确认数据为没有数据
			}
		}else{//有开车
			if(gps.getSpeed() > SPEED_DRIVING){//GPS速度>7
				if(hasPreDataCache.get(gps.getVehicleId()) != null){//缓存中有待确认数据
					analysisCallback.addDrivingData2PreDB(gps);//新增数据到待确认数据库
					analysisCallback.movePreDB2DB(gps.getVehicleId(), DRIVING_STATUS);//迁移到已确认数据库，数据标识为行车数据
				}else{
					analysisCallback.addDrivingData2DB(gps,DRIVING_STATUS);//新增数据到已确认数据库，数据为行车数据
				}
				gps.setStatus(DRIVING_STATUS);//设置为正在开车
				drivingCache.put(gps.getVehicleId(), gps);//将gps信息存入缓存
				hasPreDataCache.remove(gps.getVehicleId());//待确认数据为没有数据
			}else{
				if((gps.getDate().getTime() - drivingCacheGps.getDate().getTime())/1000 >= DRIVING_CACHE_TIME){//与缓存中存入的GPS点信息比较，时长>=30分钟
					analysisCallback.addDrivingData2PreDB(gps);//新增数据到待确认数据库
					analysisCallback.movePreDB2DB(gps.getVehicleId(), NON_DRIVING_STATUS);//迁移到已确认数据库，数据标识为非行车数据
					drivingCache.remove(gps.getVehicleId());//清除缓存GPS信息
					hasPreDataCache.remove(gps.getVehicleId());//待确认数据为没有数据
				}else{//与缓存中存入的GPS点信息比较，时长<30分钟
					analysisCallback.addDrivingData2PreDB(gps);//新增数据到待确认数据库
					hasPreDataCache.put(gps.getVehicleId(), HAS_PRE_DATA);//待确认数据为有数据
				}
			}
		}
	}

}
