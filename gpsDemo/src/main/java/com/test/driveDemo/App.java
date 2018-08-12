package com.test.driveDemo;

import java.util.List;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	DriveAnalysis driveAnalysis = new DriveAnalysis();
    	IDrivingAnalysisCallback drivingAnalysisCallbackImpl = new DrivingAnalysisCallbackImpl();
    	ReadExcel readExcel = new ReadExcel();
    	List<Gps> gpsList = readExcel.getExcelInfo("excel/gps.xlsx");
    	String vehicleId = gpsList.get(0).getVehicleId();
    	for(Gps gps : gpsList){
    		driveAnalysis.analysis(gps, drivingAnalysisCallbackImpl);
    	}
    	CreateExcel createExcel = new CreateExcel();
    	createExcel.createExcel(drivingAnalysisCallbackImpl.getGpsDB(vehicleId));
    }
}
