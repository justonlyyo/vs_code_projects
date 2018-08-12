package com.test.driveDemo;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ReadExcel {
	// 总行数
	private int totalRows = 0;
	// 总条数
	private int totalCells = 0;
	// 错误信息接收器
	private String errorMsg;

	// 构造方法
	public ReadExcel() {
	}

	// 获取总行数
	public int getTotalRows() {
		return totalRows;
	}

	// 获取总列数
	public int getTotalCells() {
		return totalCells;
	}

	// 获取错误信息
	public String getErrorInfo() {
		return errorMsg;
	}

	/**
	 * 验证EXCEL文件
	 *
	 * @param filePath
	 * @return
	 */
	public boolean validateExcel(String filePath) {
		if (filePath == null || !(WDWUtil.isExcel2003(filePath) || WDWUtil.isExcel2007(filePath))) {
			errorMsg = "文件名不是excel格式";
			return false;
		}
		return true;
	}

	/**
	 * 读EXCEL文件，获取客户信息集合
	 *
	 * @param fielName
	 * @return
	 */
	public List<Gps> getExcelInfo(String localfile) {
		File file1 = new File(localfile);// 新建文件
		// 转存文件,将文件转存到本地
		List<Gps> list = new ArrayList<Gps>();
		// 初始化输入流
		InputStream is = null;
		try {
			// 根据新建的文件实例化输入流
			is = new FileInputStream(file1);
			// 根据excel里面的内容读取信息
			list = getExcelInfo(is);
			is.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					is = null;
					e.printStackTrace();
				}
			}
		}
		return list;
	}

	/**
	 * 根据excel里面的内容读取客户信息
	 * 
	 * @param is
	 *            输入流
	 * @return
	 * @throws IOException
	 */
	public List<Gps> getExcelInfo(InputStream is) {
		List<Gps> list = null;
		try {
			Workbook wb = new XSSFWorkbook(is);
			// 读取Excel里的信息
			list = readExcelValue(wb);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 读取Excel里面信息
	 *
	 * @param wb
	 * @return
	 */
	private List<Gps> readExcelValue(Workbook wb) {
		// 得到第一个shell
		Sheet sheet = wb.getSheetAt(0);

		// 得到Excel的行数
		this.totalRows = sheet.getPhysicalNumberOfRows();

		// 得到Excel的列数(前提是有行数)
		if (totalRows >= 1 && sheet.getRow(0) != null) {
			this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();
		}
		List<Gps> gpsList = new ArrayList<Gps>();
		// 循环Excel行数,从第二行开始。标题不入库
		for (int r = 1; r < totalRows; r++) {
			Gps gps = new Gps();
			Row row = sheet.getRow(r).getCell(1).getRow();
			if (row == null)
				continue;
			// 循环Excel的列,获取相关信息
			for (int c = 0; c < this.totalCells; c++) {
				Cell cell = row.getCell(c);
				if (null != cell) {
					if (c == 0) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						gps.setVehicleId(cell.getStringCellValue());
					}else if(c == 1){
						cell.setCellType(Cell.CELL_TYPE_NUMERIC);
						gps.setSpeed(cell.getNumericCellValue());
					}else if(c == 2){
						cell.setCellType(Cell.CELL_TYPE_NUMERIC);
						gps.setDate(cell.getDateCellValue());
					}
				}
			}
			// 添加
			gpsList.add(gps);
		}
		return gpsList;
	}
}
