# pws业务流程

----

```python

"""
1. 新建预订单
"""

新建预订单参数 = {
    预订人信息,
    预订类型(散客/团队),
    预订单来源,
    预订日期区间,
    预订房型,
    预订房间数,
    入住人数(大人,儿童),
    特别需求
}
预订单 = 预订单类(**新建预订单参数)

if 有付定金:
    新建主帐参数 = {
        预订单id
    }
    主帐 = 主帐类(**新建主帐参数)
else:
    pass


"""
2. 新建入住单
一房一账?
"""


"""
3. 主帐操作
"""

新建主帐参数 = {
        预订单id(不一定有),
        入住单信息(集合, 不一定有),
        市场信息,
        入账部门及id,
        消费记录,

    }
    主帐 = 主帐类(**新建主帐参数)

def 分帐(待分帐的主帐){
    return 主帐, [分帐1, 分帐2, 分帐3,...]
}

def 并帐(账户1, 账户2, 账户3,...){
    return 付款主账户
}

def 转账(转出账户, 转入账户, 转账数目){
    return 成功后的转出账户,成功后的转入账户
}

def 冲调账(待冲调账户, 冲调类型, 金额){
    return  冲调后的账户信息
}

def 查帐(待查账户){
    return 查帐结果
}

def 增加消费记录(主帐, 原始消费记录){
    主帐.消费明细表.append(消费记录)
}

def 增加付款记录(主帐, 原始付款记录){
    主帐.消费明细表.append(付款记录)
    if 主帐总付款 >= 主帐总消费:
        主帐.平帐记录 = 平帐记录类(**args)
    else:
        pass
}

def 增加开票记录(主帐, 开票信息, 开票金额){
    主帐.开票明细表.append(开票明细)
    return 开票信息
}

def 所有消费信息(){
    return 主帐.消费明细表
}

def 所有付款信息(){
    return 主帐.付款明细表
}

def 所有开票信息(){
    return 主帐.开票明细表
}

"""结帐操作"""

def 
```