```
from django.db import models

from common.models import CommonModel


# 入住单主表 Master_Base
class MasterBase(CommonModel):
    account_id = models.IntegerField(default=-1, null=True, blank=True, verbose_name="账号id")
    MASTER_FROM_LABEL_CHOICES = (
        (0, "散客"),
        (1, "团队")
    )

    master_from_lable = models.IntegerField(verbose_name="入住单类别",
                                            choices=MASTER_FROM_LABEL_CHOICES)
    team_id = models.IntegerField(null=True, blank=True, verbose_name="团队id")
    team_name = models.CharField(max_length=128, null=True, blank=True, verbose_name="团队名字")

    biz_date = models.DateTimeField(verbose_name="营业时间")

    arr_time = models.DateTimeField(verbose_name="抵达时间")
    leave_time = models.DateTimeField(verbose_name="离开时间")

    rsv_type_id = models.IntegerField(verbose_name="预定类型")
    FROM_RSV_LABEL_CHOICES = (
        (0, "没有预订单"),
        (1, "有预订单")
    )
    from_rsv_label = models.IntegerField(verbose_name="有预定的入住单",
                                         choices=FROM_RSV_LABEL_CHOICES)
    checkin_no = models.CharField(max_length=128, verbose_name="酒店入住订单号")
    sales_person_id = models.IntegerField(null=True, blank=True, verbose_name="销售员工id")
    code_occ_id = models.IntegerField(null=True, blank=True, verbose_name="客房占用类型")
    extra_flag = models.CharField(null=True, blank=True, max_length=256, verbose_name="附加标志，每一位代表一种类型")
    rsv_person_name = models.CharField(max_length=256, verbose_name="预订人姓名")
    adult_num = models.IntegerField(verbose_name="成人数")
    children_num = models.IntegerField(null=True, blank=True, verbose_name="小孩数")
    is_fix_rate = models.BooleanField(default=True, verbose_name="是否固定房价")
    fix_rate = models.IntegerField(verbose_name="房价")

    is_secrete = models.BooleanField(default=False, verbose_name="是否保密订单")
    is_secret_rate = models.BooleanField(default=False, verbose_name="是否房价保密")
    allowed_AR = models.BooleanField(default=True, verbose_name="是否允许记账")
    AR_id = models.IntegerField(null=True, default=None,
                                verbose_name="AR账号id")
    code_commision_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="佣金码")
    code_market_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="市场码")
    code_src_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="来源码")
    reference_id = models.IntegerField(verbose_name="来源码对应的referencetable的id")

    Master_STATUS_LABLE_CHOICES = (
        (0, "在住"),
        (1, "正常离店"),
        (2, "欠费离店"),
        (3, "部分离店"),
        (-1, "异常单"),
    )

    master_status_lable = models.IntegerField(choices=Master_STATUS_LABLE_CHOICES, verbose_name="单状态")

    ACCOUNT_OPENED_CHOICES = (
        (0, "未开帐"),
        (1, "已开帐"),
    )
    account_opened = models.IntegerField(verbose_name="开账状态", choices=ACCOUNT_OPENED_CHOICES)
    total_chartge = models.FloatField(verbose_name="总消费")
    total_pay = models.FloatField(verbose_name="总付款")

    last_account_id = models.IntegerField(null=True, blank=True, verbose_name="最后帐次序号")
    last_pay_id = models.IntegerField(null=True, blank=True, verbose_name="最后付款序号")
    account_num = models.IntegerField(null=True, blank=True, verbose_name="帐次")
    pay_num = models.IntegerField(null=True, blank=True, verbose_name="支付次数")
    # MASTER_ID = models.IntegerField(null=True, blank=True, verbose_name="主帐房－(checkin_id)用来标记同住，没有同住则填充自己id")
    MASTER_ID = models.IntegerField(null=True, blank=True, verbose_name="主帐房")
    LINK_ID = models.IntegerField(null=True, blank=True, verbose_name="联房标记")
    SUB_LABLE_CHOICES = (
        (0, "房间"),
        (1, "客人")
    )
    sub_lable = models.IntegerField(null=True, blank=True, verbose_name="分账标志", default=0,
                                    choices=SUB_LABLE_CHOICES)
    is_room_posted = models.BooleanField(null=True, blank=True, verbose_name="是否房费已入账", default=False)
    building_name = models.CharField(max_length=64, null=True, blank=True, verbose_name="楼号")
    room_type = models.CharField(max_length=64, null=True, blank=True, verbose_name="房型")
    room_number = models.CharField(max_length=64, null=True, blank=True, verbose_name="房号")
    room_amount = models.CharField(max_length=512, null=True, blank=True, verbose_name="房数")
    room_facility_ids = models.CharField(null=True, blank=True, max_length=256, verbose_name="客房布置的数组")  # ?

    extra_person_num = models.IntegerField(null=True, blank=True, verbose_name="加人数量")
    extra_person_price = models.IntegerField(null=True, blank=True, verbose_name="加人单价")

    EXTRA_BED_NUM = models.IntegerField(null=True, blank=True, verbose_name="加床数量")
    EXTRA_BED_price = models.IntegerField(null=True, blank=True, verbose_name="加床单价")

    EXP_STA = models.TextField(null=True, blank=True, verbose_name="附加信息")
    RM_OCC_ID = models.IntegerField(null=True, blank=True, verbose_name="客房资源占用id")

    class Meta:
        db_table = "master_base"
        verbose_name = "入住单主表"

    def __str__(self):
        return "入住单号 ->:" + self.checkin_no


# 入住单客人信息 master_guest
class MasterGuest(CommonModel):
    room_number = models.IntegerField(null=True, blank=True, verbose_name="房间号")  # DYL
    account_id = models.IntegerField(null=True, blank=True, verbose_name="账号id")  #
    face = models.CharField(max_length=128, verbose_name="当前人脸")
    id_image = models.CharField(max_length=128, verbose_name="身份证照片")
    name = models.CharField(max_length=256, verbose_name="入住人姓名")
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
    religion = models.CharField(null=True, blank=True, max_length=128, verbose_name="宗教信仰")
    # occupation = models.CharField(null=True, blank=True, max_length=256, verbose_name="职业")
    career = models.CharField(null=True, blank=True, max_length=256, verbose_name="职业")
    nation = models.CharField(null=True, blank=True, max_length=256, verbose_name="名族")
    id_code = models.CharField(null=True, blank=True, max_length=256, verbose_name="证件类型")
    id_no = models.CharField(null=True, blank=True, max_length=256, verbose_name="证件号码")
    id_end = models.DateTimeField(null=True, blank=True, max_length=256, verbose_name="证件过期日期")
    visa_no = models.CharField(null=True, blank=True, max_length=256, verbose_name="签证编号")
    visa_grant = models.CharField(null=True, blank=True, max_length=256, verbose_name="美国签证")
    visa_end = models.DateTimeField(null=True, blank=True, verbose_name="签证起始日期")
    visa_start = models.DateTimeField(null=True, blank=True, verbose_name="签证结束日期")
    enter_end_date = models.DateTimeField(null=True, blank=True, verbose_name="最后一次入住日期")
    enter_date = models.DateTimeField(null=True, blank=True, verbose_name="入境日期")
    enter_port = models.CharField(null=True, blank=True, max_length=256, verbose_name="入境口岸")
    where_from = models.CharField(null=True, blank=True, max_length=256, verbose_name="从哪里来")
    where_to = models.CharField(null=True, blank=True, max_length=256, verbose_name="到哪里去")
    salary = models.CharField(null=True, blank=True, max_length=256, verbose_name="薪资")
    education = models.CharField(null=True, blank=True, max_length=256, verbose_name="教育水平")
    marital = models.CharField(null=True, blank=True, max_length=256, verbose_name="")
    company_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="公司id")
    company_na = models.CharField(null=True, blank=True, max_length=256, verbose_name="公司全称")
    pic_photo = models.CharField(null=True, blank=True, max_length=256, verbose_name="证件照")
    pic_sign = models.CharField(null=True, blank=True, max_length=256, verbose_name="签名照")
    remark = models.TextField(null=True, blank=True, verbose_name="备注")
    is_anonymo = models.BooleanField(null=True, blank=True, default=False, verbose_name="是否已婚")
    weixin = models.CharField(null=True, blank=True, max_length=256, verbose_name="微信号")
    mobile = models.CharField(null=True, blank=True, max_length=256, verbose_name="移动电话")
    telephone = models.CharField(null=True, blank=True, max_length=256, verbose_name="手机号码")
    email = models.EmailField(null=True, blank=True, verbose_name="邮箱")
    country_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="国家代码")
    division_id = models.CharField(max_length=256, verbose_name="部门id")
    state_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="")
    city_id = models.CharField(null=True, blank=True, max_length=256, verbose_name="城市代码")
    street_add = models.CharField(null=True, blank=True, max_length=256, verbose_name="街道地址")
    zipcode = models.CharField(null=True, blank=True, max_length=256, verbose_name="邮政编码")
    # create_hot = models.CharField(max_length=256)
    # modify_hot = models.CharField(max_length=256)
    reserve_base_id = models.CharField(max_length=128, null=True, blank=True, verbose_name="预订单号")
    guest_id = models.IntegerField(verbose_name="客管家档案号")
    leave_time = models.DateTimeField(verbose_name="离店时间")  # 去掉
    arr_time = models.DateTimeField(verbose_name="到达时间")  # 去掉
    master_base_id = models.CharField(max_length=128, verbose_name="入住主表的单号")

    class Meta:
        db_table = "master_guest"
        verbose_name = "入住单客人信息"

    def __str__(self):
        return "入住客人 ->:" + self.name
```