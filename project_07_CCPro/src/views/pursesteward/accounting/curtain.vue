<template>
    <div class="curtain">
      <!--头部的搜索-->
     <ul class="title">
       <li >
         <span>入账代码 : </span>
         <el-select v-model="value" placeholder="请选择"   >
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </li>
       <li>
         <div class="block">
           <span class="demonstration">营业日期起 :</span>
           <el-date-picker
             style="width: 150px;"
             v-model="value1"
             type="date"
             placeholder="选择日期">
           </el-date-picker>
         </div>
       </li>
       <li>
         <div class="block">
           <span class="demonstration">营业日期止 :</span>
           <el-date-picker
             style="width: 150px;"
             v-model="value1"
             type="date"
             placeholder="选择日期">
           </el-date-picker>
         </div>
       </li>
       <li>
         <span style="margin-right: 10px">AR帐</span>
         <el-checkbox v-model="checked"></el-checkbox>
       </li>
       <li>
       <span style="margin-right: 10px">含分账前主账户 : </span>
       <el-checkbox v-model="checked"></el-checkbox>
     </li>
       <li>
         <span style="margin-right: 10px">已平账户 : </span>
         <el-checkbox v-model="checked"></el-checkbox>
       </li>
       <li>
         <button>并账</button>
       </li>
     </ul>
      <!--账户种类 状态 ... -->
      <div class="status" style="height: 37%">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :header-cell-style="{background:'#68819EFF',color:'white',}"
          style="width: 100%;margin-top: 10px"
          size="mini"
          height="100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            >
          </el-table-column>

          <el-table-column
            prop="tag"
            label="账户种类"
            width="100"
            :filters="options"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag

              >{{scope.row.label}}</el-tag>
            </template>
          </el-table-column>



          <el-table-column
            prop="name"
            label="对应业务类型"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="业务主体">
          </el-table-column>

          <el-table-column
            prop="tag"
            label="账户状态"
            width="100"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>


          <el-table-column
            prop="name"
            label="营业日期">
          </el-table-column>

          <el-table-column
            prop="name"
            label="业务时间">
          </el-table-column>

          <el-table-column
            prop="tag"
            label="对应模块"
            width="100"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="tag"
            label="是否团队"
            width="100"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="tag"
            label="出账部门"
            width="100"
            :filters="options"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="tag"
            label="对应市场"
            width="100"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>


          <el-table-column
            prop="name"
            label="总消费"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="支付款"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="余额"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="总开票"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="早餐"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="摘要"
          >
          </el-table-column>

          <el-table-column
            prop="address"
            fixed="right"
            width="120"
            label="操作"
            >
            <template slot-scope="scope">
                <div>
                 <span style="color: #4488E9;cursor:default" >分账</span>
                  <span style="color: #4488E9;cursor:default">调账</span>
                  <span style="color: #4488E9;cursor:default">平帐</span>
                  <br>
                  <span style="color: #4488E9;cursor:default">付钱</span>
                  <span style="color: #4488E9;cursor:default">开票</span>
                  <span style="color: #4488E9;cursor:default">查账</span>
                </div>
            </template>


          </el-table-column>
        </el-table>
        <!--<div style="margin-top: 20px">-->
          <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
          <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
        <!--</div>-->

        <!--分页-->
        <el-pagination style="float: right;margin-right: 2%"
                       layout="prev, pager, next"
                       :page-size="pagesize"
                       @current-change="handleCurrentChange"
                       :total="total">
        </el-pagination>
      </div>
      <!--消费清单 ,收支记录-->
      <div class="shopping">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" size="mini">
          <!--消费清单-->
          <el-tab-pane label="消费清单" name="first">
            <!--头部的搜索-->
            <ul class="shopping_title">
              <li >
                <span>入账代码 : </span>
                <el-select v-model="value" placeholder="请选择"   >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期起 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期止 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <span style="margin-right: 10px">含已结</span>
                <el-checkbox v-model="checked"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">含已挂 : </span>
                <el-checkbox v-model="checked"></el-checkbox>
              </li>
            </ul>
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#68819EFF',color:'white',}"
                height="100%"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="date"
                  label="收/支">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="收支种类">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="收支详情">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="支付状态">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="应收支金额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="优惠金额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="优惠原因">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="其它费用">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="服务费">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="税费附加">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="实际收支">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <div style=" height:44px;display: inline-block; ">
                      <span style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px" >付款</span>
                      <span style="color: #4488E9;cursor:default">开票</span>
                      <span style="color: #4488E9;cursor:default">挂AR</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="handleCurrentChange"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <!--收支记录-->
          <el-tab-pane label="收支记录" name="second">
            <!--头部的搜索-->
            <ul class="shopping_title">
              <li >
                <span>入账代码 : </span>
                <el-select v-model="value" placeholder="请选择"  >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期起 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期止 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <span style="margin-right: 10px">收入 ：</span>
                <el-checkbox v-model="checked"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">支出 : </span>
                <el-checkbox v-model="checked"></el-checkbox>
              </li>
            </ul>

            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#68819EFF',color:'white',}"
                height="180"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="date"
                  label="收/支">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="收支种类">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="收支详情">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="支付状态">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="应收支金额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="优惠金额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="优惠原因">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="其它费用">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="服务费">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="税费附加">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="实际收支">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <div style=" height:44px;display: inline-block; ">
                      <span style="color: #4488E9;cursor:default;display: inline-block;height: 44px;line-height: 44px" >开票</span>
                      <span style="color: #4488E9;cursor:default">核实</span>
                      <span style="color: #4488E9;cursor:default">挂AR</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="handleCurrentChange"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <!--查看记录-->
          <el-tab-pane label="查账记录" name="third">查看记录</el-tab-pane>
          <!--分账/并账记录-->
          <el-tab-pane label="分账/并账记录" name="routing">
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#68819EFF',color:'white',}"
                height="200"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="date"
                  label="分账/并账">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="是否AR">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="主账户/子账户">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="子账户详情">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="操作时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="操作部门">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="操作用户">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核状态">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核人">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <div style=" height:44px;display: inline-block; ">
                      <span style="color: #4488E9;cursor:default;display: inline-block;height: 44px;line-height: 44px" >通过</span>
                      <span style="color: #4488E9;cursor:default">不通过</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="handleCurrentChange"
                             :total="total">
              </el-pagination>
            </div>

          </el-tab-pane>
          <!--冲调帐-->
          <el-tab-pane label="冲调帐记录" name="brew">
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#68819EFF',color:'white',}"
                height="200"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="date"
                  label="操作类型">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="总消费">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="总付款">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="余额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="140"
                  label="冲调金额（可正可负）">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="冲调原因">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="完成状态">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  label="冲调之后余额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="调账点">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="调账人">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核人">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="营业日期">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="时间">
                </el-table-column>

                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--width="120"-->
                  <!--fixed="right"-->
                  <!--label="操作">-->
                  <!--<template slot-scope="scope">-->
                    <!--<div style=" height:44px;display: inline-block; ">-->
                      <!--<span style="color: #4488E9;cursor:default;display: inline-block;height: 44px;line-height: 44px" >通过</span>-->
                      <!--<span style="color: #4488E9;cursor:default">不通过</span>-->
                    <!--</div>-->
                  <!--</template>-->
                <!--</el-table-column>-->

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="handleCurrentChange"
                             :total="total">
              </el-pagination>
            </div>

          </el-tab-pane>
          <!--催账-->
          <el-tab-pane label="催账记录" name="payment ">
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#68819EFF',color:'white',}"
                height="200"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="date"
                  label="催账日期">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="催账对象">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="欠款金额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="电话号码">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="微信号码">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="通知方式">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="通知信息">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="催账人">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="催账时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="催账次数">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="备注">
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="handleCurrentChange"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <!--结账-->
          <el-tab-pane label="结转平帐记录" name="accounts">
            <!--头部的搜索-->
            <ul class="shopping_title">
              <li >
                <span>入账代码 : </span>
                <el-select v-model="value" placeholder="请选择"   >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期起 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期止 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <span style="margin-right: 10px">已结</span>
                <el-checkbox v-model="checked"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">已转未结 : </span>
                <el-checkbox v-model="checked"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">已冲账 : </span>
                <el-checkbox v-model="checked"></el-checkbox>
              </li>
            </ul>
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#68819EFF',color:'white',}"
                height="180"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="date"
                  label="账户类型">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="操作类型">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="营业日期">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="总消费">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="总付款">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="余额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="结账入账代码">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  label="最后付款明细">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="转账账户">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="转账金额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="平帐完成标志">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="平帐点">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="平帐时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="平帐人">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核人">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核点">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="备注">
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="handleCurrentChange"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
    export default {
        name: "curtain",
      data() {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
        // 时间
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          value1: '',
          value2: '',
          checked:false,
        //  账户状态...
          tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
          multipleSelection: [],
          //分页
          total:20,
          pagesize:5,
          //消费清单
          activeName2: 'first',
          content:'账户种类',//表头下拉

        }

      },
      created:function () {

      },
      methods: {
          //账户状态
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //消费清单的table
        handleClick(tab, event) {
          console.log(tab, event);
        },
        //表头下拉框
        resetDateFilter() {
          this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        formatter(row, column) {
          return row.address;
        },
        filterTag(value, row) {
          return row.tag === value;


        },
        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        },




        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/common/module/info_list",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
      }
    }
</script>

<style lang="less" scoped>
.curtain{
  width: 95%;
  height: 95%;
   margin: 1%;
  background: white;
  overflow: hidden;
  .title{
    margin-top: 10px;
    min-width:1300px ;
    li{
      display: inline-block;
      margin-left: 5px;
      button{
        width:80px;
        height:30px;
        background:rgba(68,136,233,1);
        border: none;
        border-radius:4px;
        color: white;
        margin-left: 10px;
      }
    }
  }
  .shopping{
    height: 50%;
    margin-top: 20px;
    min-width: 1200px;
    .shopping_title{
      li{
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
}
</style>
<style>
  .el-table .cell{
    text-align:center;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    z-index: 0;
  }
  .el-table__column-filter-trigger i {
    color: white;
    font-size: 16px;
  }
</style>
