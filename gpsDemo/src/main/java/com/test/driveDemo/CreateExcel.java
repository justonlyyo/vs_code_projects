package com.test.driveDemo;

import java.io.FileOutputStream;
import java.util.List;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class CreateExcel {
	public void createExcel(List<Gps> gpsList) {
		try {
			String path = "excel/result.xlsx";
			// 创建新的Excel 工作簿
			XSSFWorkbook workbook = new XSSFWorkbook();
			// 在Excel工作簿中建一工作表，其名为缺省值
			// 如要新建一名为"用户表"的工作表，其语句为：
			XSSFSheet sheet = workbook.createSheet("result");
			for (int i = 0; i < gpsList.size(); i++) {
				Gps gps = gpsList.get(i);
				// 在索引0的位置创建行（最顶端的行）
				XSSFRow row = sheet.createRow((short) i);
				// 在索引0的位置创建单元格（左上端）
				XSSFCell cell = row.createCell((short) 0);
				// 在单元格中输入一些内容
				cell = row.createCell((short) 0);
				cell.setCellValue(gps.getVehicleId());
				
				cell = row.createCell((short) 1);
				cell.setCellValue(gps.getSpeed());

				cell = row.createCell((short) 2);
				cell.setCellValue(gps.getDate());
				
				cell = row.createCell((short) 3);
				cell.setCellValue(gps.getStatus());
			}
			// 新建一输出文件流
			FileOutputStream fOut = new FileOutputStream(path);
			// 把相应的Excel 工作簿存盘
			workbook.write(fOut);
			// 清空缓冲区数据
			fOut.flush();
			// 操作结束，关闭文件
			fOut.close();
			System.out.println("文件生成...");
		} catch (Exception e) {
			System.out.println("已运行 xlCreate() : " + e);
		}
	}
}
