package com.test.driveDemo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class DrivingAnalysisCallbackImpl implements IDrivingAnalysisCallback{
	
	Map<String, Gps> alarmCache = new ConcurrentHashMap<String, Gps>();
	
	private static final double RAPID_LIMIT = 10;//急加速、急减速阈值  km/h
	
	public List<Gps> getGpsDB(String vehicleId) {
		return gpsDB.get(vehicleId);
	}
	
	/**
	 * 添加到已确认数据库
	 * @param gps
	 */
	public void addGps2DB(Gps gps){
		List<Gps> gpsList = gpsDB.get(gps.getVehicleId());
		if(gpsList == null){
			gpsList = new ArrayList<Gps>();
			gpsDB.put(gps.getVehicleId(), gpsList);
		}
		/** ******************************急加速、急减速判断逻辑************************************* */
		if(gps.getStatus() == 1){
			Gps alarmGps = alarmCache.get(gps.getVehicleId());
			if(alarmGps == null){
				alarmCache.put(gps.getVehicleId(), gps);
			}else{
				double period = ((double)(gps.getDate().getTime() - alarmGps.getDate().getTime()))/1000;
				double speed = gps.getSpeed() - alarmGps.getSpeed();
				double speed_rapid = speed/period;
				if(Math.abs(speed_rapid) >= RAPID_LIMIT){//达到告警阈值
					if(speed_rapid > 0){
						System.out.println("产生急加速事件，业务处理在这里");
					}else{
						System.out.println("产生急减速事件,业务处理在这里");
					}
				}
				alarmCache.put(gps.getVehicleId(), gps);
			}
		}
		/** *******************************急加速、急减速判断逻辑************************************ */
		gpsList.add(gps);
	}

	/**
	 * 添加到待确认数据库
	 * @param gps
	 */
	public void addGps2PreDB(Gps gps){
		List<Gps> preGpsList = preGpsDB.get(gps.getVehicleId());
		if(preGpsList == null){
			preGpsList = new ArrayList<Gps>();
			preGpsDB.put(gps.getVehicleId(), preGpsList);
		}
		preGpsList.add(gps);
	}

	public void addDrivingData2DB(Gps gps, int status) {
		gps.setStatus(status);
		addGps2DB(gps);
	}

	public void addDrivingData2PreDB(Gps gps) {
		addGps2PreDB(gps);
	}

	public void movePreDB2DB(String vehicleId, int status) {
		List<Gps> preGpsList = preGpsDB.get(vehicleId);
		if(preGpsList != null && preGpsList.size() > 0){
			for(Gps preGps : preGpsList){
				preGps.setStatus(status);
				addGps2DB(preGps);
			}
			preGpsList.clear();
		}
	}

	public void addAbnormalData2DB(Gps gps) {
		addGps2DB(gps);
	}

}
