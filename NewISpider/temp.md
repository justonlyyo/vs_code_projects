```python

class TransferAccountsDetail(db.Entity, EntityExtends2):
    """
    转账明细表.
    注意:挂AR不是转账，而是支付的一种
    """
    _table_ = "transfer_accounts_detail"
    hotel_id = Required('Hotel', reverse="transfer_accounts_details")  # 酒店id
    hotel_group_id = Required('HotelGroup', reverse="transfer_accounts_details")  # 集团id

    is_deleted = Required(int, size=8, default=0)  # 删除标志位, 1表示被删除
    amount = Optional(Decimal, nullable=True, default=0)  # 转账金额,有符号的.一般都是大于等于0
    from_id = Required(AccountBase, reverse='transfer_accounts_details_from')  # 转出账户
    to_id = Required(AccountBase, reverse='transfer_accounts_details_to')  # 转入账户
    """
    转账结果:0：支付未完成， 1：成功，2：撤销，3：异常
    """
    do_flag = Required(int, default=0)
    # arrange_flag = Optional(str, max_len=40)  # 冲调帐操作类型 x:调账 Y:冲账 用途不明.
    """
    转账类型: 0 默认, 1 分帐转账 2 并帐的转账
    """
    transfer_type = Required(int, size=8, default=0)
    """提交转账"""
    submit_biz_date = Optional(date, default=date.today)  # 提交转账的营业日期
    submit_user = Optional(Employee, nullable=True, reverse="submit_transfer_accounts_details")  # 提交者
    submit_time = Optional(datetime, nullable=True, default=datetime.now)  # 转账提交时间
    cashier = Optional(CashRegister, nullable=True, reverse="transfer_accounts_details")  # 提交转账的收银点
    """转账操作可以撤销"""
    cancel_biz_date = Optional(date, default=date.today)  # 撤销转账的营业日期
    """撤销原因id"""
    cancel_reason_id = Optional(TransferAccountsCancelReason, nullable=True, reverse="cancel_transfer_accounts_details")
    cancel_time = Optional(datetime, default=datetime.now)  # 撤销转账的操作时间
    cancel_user = Optional(Employee, nullable=True, reverse="cancel_transfer_accounts_details")  # 撤销者
    cancel_cashier = Optional(CashRegister, nullable=True, reverse="cancel_transfer_accounts_details")  # 撤销转账的收银点

    """当转账类型为并帐转账时关联的并帐操作事件id"""
    combine_account_operation_id = Optional(CombineAccountOperation, nullable=True, reverse="transfer_accounts_details")
    """当转账类型为分帐转账时关联的分帐操作事件id"""
    split_account_operation_id = Optional(SplitAccountOperation, nullable=True, reverse="transfer_accounts_details")


class AccountBase(db.Entity, EntityExtends2):
    """主帐信息,包早信息视为消费,记录在消费明细表里"""
    _table_ = "account_base"

    hotel_id = Required('Hotel', reverse="account_bases")  # 酒店id
    hotel_group_id = Required('HotelGroup', reverse="account_bases")  # 集团id

    create_user = Required('Employee', reverse='create_accounts')  # 创建者
    modify_user = Required('Employee', reverse='modify_accounts')  # 最后修改的用户
    create_time = Optional(datetime, nullable=True)  # 创建时间
    modify_time = Optional(datetime, nullable=True)  # 最后的修改时间

    is_deleted = Required(int, size=8, default=0)  # 删除标志位, 1表示被删除
    account_type = Required(int, size=8)  # 账户类型:0:正常账户 1：AR账户
    """
    reference_link_label是关联方标志，0：预定账户，1：入住单，2：客人单账户 3：团队账户
    reference_id是关联方id,和reference_link_label配合使用.
    由于模块分布的原因.这里无法使用外键
    """
    reference_link_label = Required(int, size=8, unsigned=True)
    reference_id = Required(int)
    account_status = Required(int, size=8, default=0)  # 主帐状态,0:正常进行中、1：已平账、2：已取消、3、异常
    biz_date = Required(date)  # 营业日期
    gen_date = Required(date)  # 业务时间 实际业务发生的日期，可能跟入帐日期不一致
    module_id = Optional(str)  # 模块id, 本质上时外键
    check_flag = Required(int, size=8, default=0)  # 审核标志 0:未审核 1：审核通过，2 ：异常

    sub_account_bases = Set('AccountBase', reverse='before_sub_account')  # 分帐后的子账户
    before_sub_account = Optional('AccountBase', nullable=True, reverse='sub_account_bases')  # 分帐前的主账户
    split_account_operations = Set("SplitAccountOperation", reverse="before_split_account_id")  # 分张操作记录
    sub_account_count = Optional(int, size=8, default=0)  # 分帐的数量.默认0,冗余字段

    """
    分账标志 0：未分账 1：已经分账（分账后的主账户） 2：分账户（分账后的分账户）,
    此字段的作为before_sub_account和sub_account_bases字段的冗余字段.
    争议:
    有关分帐标志位的问题:
    如果可以递归分帐的话(一个递归并帐过的账户可能会递归的进行分帐),那么会出现一个账户既是主帐也是分帐的情况,这时候,标志位如何表示?
    
    建议不以此标志位为准则表示分帐还是主帐.而是
    1. 以sub_account_bases判断是否有分帐(主帐)?
    2. 以before_sub_account判断自己是否是分出来的帐(子账)?
    
    并帐标志位在递归并帐的时候存在相同的问题!
    """
    split_flag = Optional(int, size=8, default=0)  # 分帐标识
    team_flag = Required(int, size=8, default=0)  # 是否团队账户? 0.非团队账户,1.团队账户

    team_id = Optional(int)  # 团队id, 由于模块分割,无法使用外键

    market_id = Required(int)  # 市场id
    market_code = Required(str, max_len=40)  # 市场码,市场id的冗余字段
    """
    平帐标记 a=冲帐 t=转帐 c=结帐
    为空表示未平帐
    """
    close_flag = Optional(str, nullable=True)
    transfer_accounts_details_from = Set('TransferAccountsDetail', reverse='from_id')  # 转出账户
    transfer_accounts_details_to = Set('TransferAccountsDetail', reverse='to_id')  # 转入账户
    remark = Optional(str, max_len=500, nullable=True)  # 备注信息
    close_id = Optional('AccountCloseOperation')  # 平帐记录id
    balance = Optional(Decimal, default=0)  # 余额
    pay_sum = Optional(Decimal, default=0)  # 总付款
    total_consumption = Optional(Decimal, default=0)  # 总消费
    total_invoice = Optional(Decimal)  # 开票总计

    """
    是否已经并帐 0:未并帐，1：并帐了（并账后的分账户），2：被并账（并账后的主账户）,
    是appended_combined_accounts和main_combined_account的冗余字段
    此字段作用存疑
    """
    combined_flag = Optional(int, size=8, default=0)
    appended_combined_accounts = Set('AccountBase', reverse='main_combined_account')  # 并帐中的子账户
    main_combined_account = Optional('AccountBase', reverse='appended_combined_accounts')  # 并帐中的主账户(付钱的那个)
    combine_account_operations = Set('CombineAccountOperation', reverse='main_combine_account_id')  # 并帐操作记录

    """
    并帐的账户数量.不包含主帐户,是appended_combined_accounts的冗余字段
    """
    combined_account_count = Optional(int, size=8)

    arrange_account_operations = Set('ArrangeAccountOperation', reverse="account_id")  # 冲调账记录
    arrange_accounts_count = Optional(int, size=8)  # 冲调帐计数,冗余字段段

    check_record = Optional("CheckAccountOperation", nullable=True, reverse="account_id")  # 查帐记录
    pay_details = Set("PayDetail", reverse="account_id")  # 付款记录
    bill_details = Set("BillDetail", reverse="account_id")  # 开票记录
    charge_details = Set('ChargeDetail')  # 消费明细



class SplitAccountOperation(db.Entity, EntityExtends2):
    """
    分帐操作记录表
    """
    _table_ = "split_account_operation"

    hotel_id = Required('Hotel', reverse="split_account_operations")  # 酒店id
    hotel_group_id = Required('HotelGroup', reverse="split_account_operations")  # 集团id

    create_user = Required('Employee', reverse='create_split_account_operations')  # 创建者
    modify_user = Required('Employee', reverse='modify_split_account_operations')  # 最后修改的用户
    create_time = Optional(datetime, nullable=True)  # 创建时间
    modify_time = Optional(datetime, nullable=True)  # 最后的修改时间

    is_delete = Required(int, size=8, default=0)  # 是否已删除

    """分帐涉及的转账记录"""
    transfer_accounts_details = Set("TransferAccountsDetail", reverse="split_account_operation_id")
    before_split_account_id = Required(AccountBase, reverse="split_account_operations")  # 分账前的主账号id
    split_account_count = Required(int, default=0)  # 分账后的账号数量
    split_method_id = Optional(int, nullable=True)  # 分帐方法id,伪外键
    cashier = Optional(CashRegister, nullable=True, reverse="split_account_operations")  # 关联收银机
    dept_id = Optional(Dept, nullable=True, reverse="split_account_operations")  # 部门id

```

arrange_account_operations  # 冲调账记录
arranged_amount is_deleted  cancel_arrange_time

pay_details # 付款记录
is_deleted==0 pay_status==0  pay_amount

charge_details  # 消费明细
is_deleted==0   real_charge

transfer_accounts_details_from # 转出账户

do_flag = 1 is_deleted==0  

transfer_accounts_details_to  # 转入账户

do_flag = 1  is_deleted==0   cancel_time 