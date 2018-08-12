package com.test.driveDemo;

import java.util.Date;

public class Gps {
	
	private String vehicleId;//车辆id
	private double speed;//车速  km/h
	private Date date;//数据时间
	private Integer status;//-1异常数据   0 非行车   1行车
	
	public String getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(String vehicleId) {
		this.vehicleId = vehicleId;
	}
	public double getSpeed() {
		return speed;
	}
	public void setSpeed(double speed) {
		this.speed = speed;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}

}
