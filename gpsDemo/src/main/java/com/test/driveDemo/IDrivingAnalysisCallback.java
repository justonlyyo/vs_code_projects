package com.test.driveDemo;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public interface IDrivingAnalysisCallback {
	
	final Map<String, List<Gps>> gpsDB = new ConcurrentHashMap<String, List<Gps>>();//已确认数据库
	
	final Map<String, List<Gps>> preGpsDB = new ConcurrentHashMap<String, List<Gps>>();//待确认数据库 
	
	/**
	 * 添加gps数据到已确认数据库
	 * @param gps
	 * @param status 0 非行车   1行车
	 */
	void addDrivingData2DB(Gps gps,int status);
	
	/**
	 * 添加gps数据到待确认数据库
	 * @param gps
	 */
	void addDrivingData2PreDB(Gps gps);

	/**
	 * 将待确认gps数据转移到已确认数据库
	 * @param vehicleId
	 * @param status 0 非行车   1行车
	 */
	void movePreDB2DB(String vehicleId,int status);
	
	/**
	 * 将异常数据写入已确认数据库
	 * @param gps
	 */
	void addAbnormalData2DB(Gps gps);
	
	/**
	 * 根据车辆id获取车辆gps数据
	 * @param vehicleId
	 * @return
	 */
	List<Gps> getGpsDB(String vehicleId);
	
}
