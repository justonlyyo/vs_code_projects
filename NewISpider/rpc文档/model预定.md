```
from django.db import models

from common.models import CommonModel


# 预订单主表 reserve_base
class ReserveBase(CommonModel):
    account_id = models.IntegerField(blank=True, null=True, verbose_name="账户id")
    biz_date = models.DateTimeField(verbose_name="营业时间")  # 2016-06-03 13:00:00
    RSV_CHOICES = (
        (0, "散客预定"),
        (1, "团队预定"),
        (2, "酒店预定")
    )
    team_id = models.IntegerField(null=True, blank=True, verbose_name="团队id")
    team_name = models.CharField(max_length=128, null=True, blank=True, verbose_name="团队名")
    rsv_from = models.IntegerField(default=0, blank=True, verbose_name="预定种类",
                                   choices=RSV_CHOICES)
    rsv_type_id = models.IntegerField(verbose_name="预定类型")
    rsv_no = models.CharField(max_length=128, blank=True, verbose_name="酒店预定单号")

    confirmed = models.BooleanField(default=False, verbose_name="是否已确认")

    sales_person_id = models.IntegerField(null=True, blank=True, verbose_name="销售员工id")
    code_occ_id = models.IntegerField(null=True, blank=True, verbose_name="客房占用类型")
    extra_flag = models.IntegerField(null=True, blank=True, verbose_name="附加标志，每一位代表一种类型")
    rsv_person_name = models.CharField(max_length=256, verbose_name="预订人姓名")
    adult_num = models.IntegerField(verbose_name="成人数")
    children_num = models.IntegerField(null=True, blank=True, verbose_name="儿童数")
    arr_time = models.DateTimeField(verbose_name="抵达时间")
    leave_time = models.DateTimeField(verbose_name="离开时间")
    purpose = models.CharField(null=True, blank=True, max_length=256, verbose_name="目的")

    name = models.CharField(verbose_name="客人姓名", max_length=256)  # DYL
    email_master = models.EmailField(null=True, blank=True, verbose_name="预订人email")
    weixin_master = models.CharField(null=True, blank=True, max_length=256, verbose_name="预订人微信")
    mobile_master = models.CharField(max_length=256, verbose_name="预定人手机")
    telephone_master = models.CharField(null=True, blank=True, max_length=256, verbose_name="预定人电话")
    ID_no = models.CharField(max_length=256, verbose_name="预订人证件号")

    is_fix_rate = models.BooleanField(default=True, verbose_name="是否固定房价")
    fix_rate = models.IntegerField(null=True, blank=True, verbose_name="房价")
    is_secrete = models.BooleanField(default=False, verbose_name="是否保密订单")
    is_secret_rate = models.BooleanField(default=False, verbose_name="是否房价保密")
    allowed_AR = models.BooleanField(default=True, verbose_name="是否允许记账")
    AR_id = models.IntegerField(verbose_name="AR账号id", null=True, blank=True, default=None)

    code_commision_id = models.CharField(max_length=256, verbose_name="佣金码")
    code_market_id = models.CharField(max_length=256, verbose_name="市场码")
    code_src_id = models.CharField(max_length=256, verbose_name="来源码")
    RSV_STATUS_CHOICES = (
        (0, "预定"),
        (1, "入住"),
        (2, "部分入住"),
        (3, "结账/取消"),
        (-1, "no show"),
    )
    rsv_status_lable = models.IntegerField(default=0,
                                           choices=RSV_STATUS_CHOICES,
                                           verbose_name="订单状态")
    ACCOUNT_OPEN_CHOICRS = (
        (0, "未开帐"),
        (1, "已开帐"),
    )
    account_opened = models.IntegerField(null=True, blank=True, default=0,
                                         choices=ACCOUNT_OPEN_CHOICRS,
                                         verbose_name="开帐状态")

    total_chartge = models.FloatField(null=True, blank=True, default=0.0, verbose_name="总消费")
    total_pay = models.FloatField(null=True, blank=True, default=0.0, verbose_name="总付款")

    last_account_id = models.IntegerField(null=True, blank=True, verbose_name="最后帐次序号")
    last_pay_id = models.IntegerField(null=True, blank=True, verbose_name="最后付款序号")
    account_num = models.IntegerField(null=True, blank=True, verbose_name="帐次")
    pay_num = models.IntegerField(null=True, blank=True, verbose_name="支付次数")

    class Meta:
        db_table = "reserve_base"
        verbose_name = "预订单主表"

    def __str__(self):
        return "预定主单号: " + self.rsv_no + ", 预订人:" + str(self.name)


# 　预订单入住客人信息  reserve_guest
class ReserveGuest(CommonModel):
    room_number = models.IntegerField(null=True, blank=True, verbose_name="房间号")  # DYL
    name = models.CharField(verbose_name="客人姓名", max_length=256)
    last_name = models.CharField(null=True, blank=True, verbose_name="客人名", max_length=256)
    first_name = models.CharField(null=True, blank=True, verbose_name="", max_length=256)
    name2 = models.CharField(null=True, blank=True, verbose_name="姓名２", max_length=256)
    name_combi = models.CharField(null=True, blank=True, verbose_name="曾用名", max_length=256)
    is_save = models.BooleanField(default=True, verbose_name="是否保存")
    sex = models.CharField(null=True, blank=True, max_length=256, verbose_name="性别")
    language = models.CharField(null=True, blank=True, max_length=256, verbose_name="语言")
    title = models.CharField(null=True, blank=True, max_length=256, verbose_name="头衔")
    salutation = models.CharField(null=True, blank=True, max_length=256, verbose_name="称呼")
    birth = models.DateTimeField(null=True, blank=True, verbose_name="生日")
    race = models.CharField(null=True, blank=True, max_length=256, verbose_name="比赛荣誉")
    religion = models.CharField(max_length=128, verbose_name="宗教信仰")
    # occupation = models.CharField(null=True, blank=True, max_length=256, verbose_name="职业")
    career = models.CharField(null=True, blank=True, max_length=256, verbose_name="职业")
    nation = models.CharField(null=True, blank=True, max_length=256, verbose_name="名族")
    id_code = models.CharField(null=True, blank=True, max_length=256, verbose_name="证件类型")
    id_no = models.CharField(max_length=256, verbose_name="证件号码")
    id_end = models.DateTimeField(null=True, blank=True, max_length=256, verbose_name="证件过期日期")
    visa_no = models.CharField(null=True, blank=True, max_length=256, verbose_name="签证编号")
    visa_grant = models.CharField(null=True, blank=True, max_length=256, verbose_name="美国签证")
    visa_end = models.DateTimeField(null=True, blank=True, verbose_name="签证起始日期")
    visa_start = models.DateTimeField(null=True, blank=True, verbose_name="签证结束日期")
    enter_end_date = models.DateTimeField(null=True, blank=True, verbose_name="最后一次入住日期")
    enter_date = models.DateTimeField(null=True, blank=True, verbose_name="入境日期")
    enter_port = models.CharField(max_length=256, verbose_name="入境口岸")
    where_from = models.CharField(null=True, blank=True, max_length=256, verbose_name="从哪里来")
    where_to = models.CharField(null=True, blank=True, max_length=256, verbose_name="到哪里去")
    salary = models.CharField(null=True, blank=True, max_length=256, verbose_name="薪资")
    education = models.CharField(null=True, blank=True, max_length=256, verbose_name="教育水平")
    marital = models.CharField(null=True, blank=True, max_length=256, verbose_name="")
    company_id = models.IntegerField(null=True, blank=True, verbose_name="公司id")
    company_na = models.CharField(null=True, blank=True, max_length=256, verbose_name="公司全称")
    pic_photo = models.CharField(null=True, blank=True, max_length=256, verbose_name="证件照")
    pic_sign = models.CharField(null=True, blank=True, max_length=256, verbose_name="签名照")
    remark = models.TextField(null=True, blank=True, verbose_name="备注")
    is_anonymo = models.BooleanField(null=True, blank=True, default=False, verbose_name="是否已婚")
    weixin = models.CharField(null=True, blank=True, max_length=256, verbose_name="微信号")
    mobile = models.CharField(null=True, blank=True, max_length=256, verbose_name="移动电话")
    telephone = models.CharField(max_length=256, verbose_name="手机号码")
    email = models.EmailField(null=True, blank=True, verbose_name="邮箱")
    country_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="国家代码")
    division_id = models.CharField(max_length=256, verbose_name="部门id")
    state_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="")
    city_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="城市代码")
    street_add = models.CharField(null=True, blank=True, max_length=256, verbose_name="街道地址")
    zipcode = models.CharField(null=True, blank=True, max_length=256, verbose_name="邮政编码")
    reserve_base_id = models.CharField(max_length=128, verbose_name="预订单号")
    guest_id = models.IntegerField(null=True, blank=True, verbose_name="客管家档案号")

    class Meta:
        db_table = "reserve_guest"
        verbose_name = "预订单客人信息"

    def __str__(self):
        return "预订人-> " + self.name


# 预定房型房价表： REV _RT_rate
class RevRtRate(CommonModel):
    reserve_base_id = models.CharField(max_length=128, verbose_name="预定单号")
    checkin_date = models.DateTimeField(verbose_name="入住日期")
    checkin_time = models.DateTimeField(verbose_name="入住时间")
    room_class = models.CharField(max_length=64, verbose_name="房类")
    room_type = models.CharField(max_length=64, verbose_name="房型")
    room_number = models.CharField(null=True, blank=True, max_length=512, verbose_name="房间号")
    code_room_special_ids = models.CharField(null=True, blank=True, max_length=256, verbose_name="特殊要求们")
    code_room_facilities_ids = models.CharField(null=True, blank=True, max_length=256, verbose_name="客房布置们")
    is_arranged = models.BooleanField(default=False, null=True, blank=True, verbose_name="是否已经排房")
    rmocc_ids = models.CharField(max_length=512, null=True, blank=True, verbose_name="客房资源占用id 的List")
    ratecode_id = models.IntegerField(null=True, blank=True, verbose_name="房价码 code_ratecode.id")
    add_person_num = models.IntegerField(null=True, blank=True, verbose_name="加人数量")
    add_person_price = models.FloatField(null=True, blank=True, verbose_name="加人价格")
    add_bed_num = models.IntegerField(null=True, blank=True, verbose_name="加床数量")
    add_bed_price = models.FloatField(null=True, blank=True, verbose_name="加床价格")
    code_pkg_id = models.IntegerField(null=True, blank=True, verbose_name="包价代码id")
    add_pkg_num = models.IntegerField(null=True, blank=True, verbose_name="增加的早餐份数")
    add_pkg_price = models.FloatField(null=True, blank=True, verbose_name="增加早餐单价")
    rate_service_fee = models.FloatField(null=True, blank=True, verbose_name="服务费")
    rate_tax = models.FloatField(null=True, blank=True, verbose_name="价外税")
    lower_price_id = models.IntegerField(null=True, blank=True, verbose_name="价格优惠流程id")
    lower_price_reason = models.CharField(max_length=512, verbose_name="降价原因id")
    lower_price_amount = models.FloatField(null=True, blank=True, verbose_name="减少金额")
    real_rate = models.FloatField(verbose_name="实际价格")
    remark = models.TextField(null=True, blank=True, verbose_name="备注")

    class Meta:
        db_table = "rev_rt_rate"
        verbose_name = "预定房型房价"

    def __str__(self):
        return "预定的房型: " + str(self.room_type)
```