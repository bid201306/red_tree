var fNodes = [
    {
        name: "父节点1 - 展开", open: true, disabled: true,
        children: [
            {
                name: "父节点11 - 折叠",
                children: [
                    { name: "叶子节点111" },
                    { name: "叶子节点112" },
                    { name: "叶子节点113" },
                    { name: "叶子节点114" }
                ]
            },
            {
                name: "父节点12 - 折叠",
                children: [
                    { name: "叶子节点121" },
                    { name: "叶子节点122" },
                    { name: "叶子节点123" },
                    { name: "叶子节点124" }
                ]
            },
            { name: "父节点13 - 没有子节点", isParent: true }
        ]
    },
    {
        name: "父节点2 - 展开", open: true,
        children: [
            {
                name: "父节点21 - 展开", open: true,
                children: [
                    { name: "叶子节点211叶子节点211叶子节点211叶子节点211叶子节点211叶子节点211叶子节点211" },
                    { name: "叶子节点212" },
                    { name: "叶子节点213" },
                    { name: "叶子节点214" }
                ]
            },
            {
                name: "父节点22 - 折叠",
                children: [
                    { name: "叶子节点221" },
                    { name: "叶子节点222" },
                    { name: "叶子节点223" },
                    { name: "叶子节点224" }
                ]
            },
            {
                name: "父节点23 - 折叠",
                children: [
                    { name: "叶子节点231" },
                    { name: "叶子节点232" },
                    { name: "叶子节点233" },
                    { name: "叶子节点234" }
                ]
            }
        ]
    },
    { name: "父节点3 - 没有子节点", isParent: true }
];

var mydata = [
	{
        "id":"0",
        "type":"原子服务目录",
        "name":"原子服务目录",
        "code":"原子服务目录",
        "children":[
            {
                "id":"2504",
                "type":"",
                "name":"中国铁塔M域",
                "code":"34",
                "children":[
                    {
                        "id":"2505",
                        "type":"",
                        "name":"财务管理系统",
                        "code":"40.4001",
                        "children":[
                            {
                                "id":"10082",
                                "type":"",
                                "name":"财务测试接口",
                                "code":"40.4001.GetSayHello",
                                "children":[

                                ]
                            },
                            {
                                "id":"10084",
                                "type":"",
                                "name":"财务测试1_GetSayHello",
                                "code":"40.4001.GetSayHello1",
                                "children":[

                                ]
                            },
                            {
                                "id":"10571",
                                "type":"",
                                "name":"PMS_财务_付款查询",
                                "code":"40.4001.queryProjectPayinfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10687",
                                "type":"",
                                "name":"M域_CW_测试",
                                "code":"40.4001.receiveExpenseInfo1",
                                "children":[

                                ]
                            },
                            {
                                "id":"10986",
                                "type":"",
                                "name":"商务_CW_订单结算汇总信息",
                                "code":"40.4001.SettleOrdersumInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10586",
                                "type":"",
                                "name":"HR_CW_工资明细信息接口服务",
                                "code":"40.4001.salaryDetailInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10667",
                                "type":"",
                                "name":"RMS_CW_资产数据同步服务",
                                "code":"40.4001.GetZCZYInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10107",
                                "type":"",
                                "name":"主数据_晚来测试",
                                "code":"40.4001.MDMWLDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10267",
                                "type":"",
                                "name":"M域_CW_站点信息",
                                "code":"40.4001.MDMSITE",
                                "children":[

                                ]
                            },
                            {
                                "id":"10346",
                                "type":"",
                                "name":"MDM_CW_接收项目信息",
                                "code":"40.4001.MDMPROJECTS",
                                "children":[

                                ]
                            },
                            {
                                "id":"10061",
                                "type":"",
                                "name":"M域_CW_结算发票尾差信息接口",
                                "code":"40.4001.InvoiceBalance_asyn",
                                "children":[

                                ]
                            },
                            {
                                "id":"10103",
                                "type":"",
                                "name":"M域_CW_账号信息接口",
                                "code":"40.4001.addUser",
                                "children":[

                                ]
                            },
                            {
                                "id":"10172",
                                "type":"",
                                "name":"M域_CW_人员账户接口",
                                "code":"40.4001.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10446",
                                "type":"",
                                "name":"合同_CW_合同信息分发",
                                "code":"40.4001.UpdateContractService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10447",
                                "type":"",
                                "name":"合同_CW_合同状态更新",
                                "code":"40.4001.UpdateContractStateService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10572",
                                "type":"",
                                "name":"PMS_财务_成本查询",
                                "code":"40.4001.queryProjectcostinfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10886",
                                "type":"",
                                "name":"商务_CW_新旧电池置换",
                                "code":"40.4001.BatteryReplacement",
                                "children":[

                                ]
                            },
                            {
                                "id":"10934",
                                "type":"",
                                "name":"物业_财务_费用结算信息接口（新）",
                                "code":"40.4001.receiveExpenseInfo_N",
                                "children":[

                                ]
                            },
                            {
                                "id":"10041",
                                "type":"",
                                "name":"M域_CW_订单收货信息接口",
                                "code":"40.4001.ReceiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10060",
                                "type":"",
                                "name":"M域_CW_订单结算信息接口",
                                "code":"40.4001.SettleOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10089",
                                "type":"",
                                "name":"M域_CW_费用结算信息接口",
                                "code":"40.4001.receiveExpenseInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10426",
                                "type":"",
                                "name":"CRM_CW_查询财务工程会计暂估转固数据服务",
                                "code":"40.4001.Cost_query",
                                "children":[

                                ]
                            },
                            {
                                "id":"10606",
                                "type":"",
                                "name":"HR_CW_工资汇总信息接口服务",
                                "code":"40.4001.salaryDeptInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11128",
                                "type":"",
                                "name":"商务交易_CW_订单校验信息接口",
                                "code":"40.4001.CatchNonExistedOrders",
                                "children":[

                                ]
                            },
                            {
                                "id":"11294",
                                "type":"",
                                "name":"仓储_CW_仓储系统出入库信息接口服务",
                                "code":"40.4001.receiveGoodMovementInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11726",
                                "type":"",
                                "name":"创新_财务_同步创新项目结项状态接口",
                                "code":"40.4001.SynProjectFinalState",
                                "children":[

                                ]
                            },
                            {
                                "id":"11787",
                                "type":"",
                                "name":"物业_财务_电费开票信息接口",
                                "code":"40.4001.receiveElectricInvoiceInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11989",
                                "type":"",
                                "name":"物业_财务_推送电费退款信息接口",
                                "code":"40.4001.rentalRefundBillElec",
                                "children":[

                                ]
                            },
                            {
                                "id":"11865",
                                "type":"",
                                "name":"审计_财务_列账数量稽核接口",
                                "code":"40.4001.ReturnOrderAuditResult",
                                "children":[

                                ]
                            },
                            {
                                "id":"12034",
                                "type":"",
                                "name":"CRM_财务_回款信息",
                                "code":"40.4001.CrmSrhl",
                                "children":[

                                ]
                            },
                            {
                                "id":"12035",
                                "type":"",
                                "name":"CRM_财务_发票信息查询",
                                "code":"40.4001.InvoiceDetails",
                                "children":[

                                ]
                            },
                            {
                                "id":"12036",
                                "type":"",
                                "name":"新0A_财务_接收出差申请单信息",
                                "code":"40.4001.OACCSQJS",
                                "children":[

                                ]
                            },
                            {
                                "id":"12045",
                                "type":"",
                                "name":"交易_财务_订单接口服务(PT_ORDERS)",
                                "code":"40.4001.OrdersRecevie",
                                "children":[

                                ]
                            },
                            {
                                "id":"12046",
                                "type":"",
                                "name":"认证_财务_结算单接口服务(PT_SETTLEMENTS)",
                                "code":"40.4001.SettlementsRecevie",
                                "children":[

                                ]
                            },
                            {
                                "id":"12086",
                                "type":"",
                                "name":"物业_财务_代垫电费收入回款流程",
                                "code":"40.4001.ElecReceivedPayments",
                                "children":[

                                ]
                            },
                            {
                                "id":"11169",
                                "type":"",
                                "name":"公共库_财务_接收站址同步",
                                "code":"40.4001.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11358",
                                "type":"",
                                "name":"公共库_财务_组织区域",
                                "code":"40.4001.GG_INTERFACE_ORG_REG_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11443",
                                "type":"",
                                "name":"M域_CW_同步创新项目结项状态接口",
                                "code":"40.4001.SynProjectFinalSate",
                                "children":[

                                ]
                            },
                            {
                                "id":"11647",
                                "type":"",
                                "name":"商城交易_财务系统_费用项目订单信息接口",
                                "code":"40.4001.receiveExpOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11866",
                                "type":"",
                                "name":"审计_财务_列账订单校验接口",
                                "code":"40.4001.ReturnOrderValidResult",
                                "children":[

                                ]
                            },
                            {
                                "id":"11355",
                                "type":"",
                                "name":"RMS_财务_站址业务判断接口",
                                "code":"40.4001.siteBusinessInquiries",
                                "children":[

                                ]
                            },
                            {
                                "id":"11359",
                                "type":"",
                                "name":"公共库_财务_项目信息",
                                "code":"40.4001.PDSSProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11361",
                                "type":"",
                                "name":"公共库_财务_合同信息",
                                "code":"40.4001.PDSSContractInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11372",
                                "type":"",
                                "name":"物业_财务_删单接口",
                                "code":"40.4001.ReturnDelSuccess",
                                "children":[

                                ]
                            },
                            {
                                "id":"11987",
                                "type":"",
                                "name":"资源_财务_蓄电池资产拆分接口",
                                "code":"40.4001.BatterySpliteInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12026",
                                "type":"",
                                "name":"新主数据_财务_服务编码接口服务",
                                "code":"40.4001.serviceCodeDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12027",
                                "type":"",
                                "name":"新主数据_财务_物资编码接口服务",
                                "code":"40.4001.productCodeDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11320",
                                "type":"",
                                "name":"物业_财务_生成报账单首次返回信息",
                                "code":"40.4001.BzdFrist",
                                "children":[

                                ]
                            },
                            {
                                "id":"11360",
                                "type":"",
                                "name":"公共库_财务_项目状态信息",
                                "code":"40.4001.PDSSProjectStatus",
                                "children":[

                                ]
                            },
                            {
                                "id":"11425",
                                "type":"",
                                "name":"M域_CW_推送场租退款信息接口",
                                "code":"40.4001.rentalRefund",
                                "children":[

                                ]
                            },
                            {
                                "id":"11442",
                                "type":"",
                                "name":"M域_CW_同步创新项目信息接口",
                                "code":"40.4001.SynInnovationProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11665",
                                "type":"",
                                "name":"审计_财务_审计费列账红冲状态接口",
                                "code":"40.4001.ReturnAccountOffsetState",
                                "children":[

                                ]
                            },
                            {
                                "id":"11709",
                                "type":"",
                                "name":"资源_财务_资源报废流程资产净值查询接口",
                                "code":"40.4001.ReturnNetAssetValue",
                                "children":[

                                ]
                            },
                            {
                                "id":"11917",
                                "type":"",
                                "name":"新主数据_财务_供应商接口",
                                "code":"40.4001.pushSupplierDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11248",
                                "type":"",
                                "name":"PMS_财务_项目信息同步",
                                "code":"40.4001.ReturnProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11249",
                                "type":"",
                                "name":"PMS_财务_清单信息同步",
                                "code":"40.4001.ReturnDetailedList",
                                "children":[

                                ]
                            },
                            {
                                "id":"11251",
                                "type":"",
                                "name":"PMS_财务_送审记录同步",
                                "code":"40.4001.SendAuditInterface",
                                "children":[

                                ]
                            },
                            {
                                "id":"11252",
                                "type":"",
                                "name":"PMS_财务_联查数据同步",
                                "code":"40.4001.ReturnMultiList",
                                "children":[

                                ]
                            },
                            {
                                "id":"11254",
                                "type":"",
                                "name":"PMS_财务_决算明细同步",
                                "code":"40.4001.ReturnFinalData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11356",
                                "type":"",
                                "name":"审计_财务_审计项目状态接口new",
                                "code":"40.4001.auditProjectsStates",
                                "children":[

                                ]
                            },
                            {
                                "id":"11390",
                                "type":"",
                                "name":"RMS_CW_父子资产转换接口",
                                "code":"40.4001.IFatherChildAssetTrans",
                                "children":[

                                ]
                            },
                            {
                                "id":"11428",
                                "type":"",
                                "name":"物业_财务_物业退款服务",
                                "code":"40.4001.rentalRefundBill",
                                "children":[

                                ]
                            },
                            {
                                "id":"11259",
                                "type":"",
                                "name":"PMS_财务_决算金额同步",
                                "code":"40.4001.ReturnFinalJE",
                                "children":[

                                ]
                            },
                            {
                                "id":"11353",
                                "type":"",
                                "name":"审计_财务_审计项目状态接口",
                                "code":"40.4001.auditProjectsStatesService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11436",
                                "type":"",
                                "name":"M域_CW_回传新旧项目标识接口",
                                "code":"40.4001.ReturnProjectFlag",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2507",
                        "type":"",
                        "name":"商务认证系统",
                        "code":"40.4006",
                        "children":[
                            {
                                "id":"10083",
                                "type":"",
                                "name":"测试_订单收货信息接口服务",
                                "code":"40.4006.receivingInterfaceServie",
                                "children":[

                                ]
                            },
                            {
                                "id":"10100",
                                "type":"",
                                "name":"财务系统_付款后的状态反馈接口",
                                "code":"40.4006.paymentStatusService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10467",
                                "type":"",
                                "name":"认证平台_主数据_项目信息",
                                "code":"40.4006.MDMPROJECTS",
                                "children":[

                                ]
                            },
                            {
                                "id":"10967",
                                "type":"",
                                "name":"PMS_商务_项目设计询价",
                                "code":"40.4006.purchase",
                                "children":[

                                ]
                            },
                            {
                                "id":"11007",
                                "type":"",
                                "name":"财务_商务平台_付款后的状态反馈接口（新）",
                                "code":"40.4006.paymentStatus",
                                "children":[

                                ]
                            },
                            {
                                "id":"11026",
                                "type":"",
                                "name":"财务_商务_工程物资退库接口服务",
                                "code":"40.4006.materialReturnedExchequer",
                                "children":[

                                ]
                            },
                            {
                                "id":"11046",
                                "type":"",
                                "name":"商务认证_商务交易_更新同步商品状态接口",
                                "code":"40.4006.updateGoodsSyncStatus",
                                "children":[

                                ]
                            },
                            {
                                "id":"10487",
                                "type":"",
                                "name":"PMS_商务_订单(项目设计清单)收货状态接口",
                                "code":"40.4006.RCVSTATES",
                                "children":[

                                ]
                            },
                            {
                                "id":"10513",
                                "type":"",
                                "name":"商务平台_商务认证_项目设计清单取消",
                                "code":"40.4006.CANCELPURCHASE",
                                "children":[

                                ]
                            },
                            {
                                "id":"10566",
                                "type":"",
                                "name":"MDM_商务_客商信息",
                                "code":"40.4006.MDMWLDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10788",
                                "type":"",
                                "name":"RMS_商务_电池置换",
                                "code":"40.4006.assetSwap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10080",
                                "type":"",
                                "name":"商务平台_订单收货信息接口服务",
                                "code":"40.4006.receivingInterfaceServiec",
                                "children":[

                                ]
                            },
                            {
                                "id":"10099",
                                "type":"",
                                "name":"商务平台_订单收货信息接口服务",
                                "code":"40.4006.OrderReceiveService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10197",
                                "type":"",
                                "name":"4A_商务_账号变更服务",
                                "code":"40.4006.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10198",
                                "type":"",
                                "name":"4A_商务_账号角色授权服务",
                                "code":"40.4006.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10486",
                                "type":"",
                                "name":"PMS_商务_项目设计询价(项目设计清单)接口服务",
                                "code":"40.4006.PURCHASE",
                                "children":[

                                ]
                            },
                            {
                                "id":"10768",
                                "type":"",
                                "name":"合同_商务_合同状态变更",
                                "code":"40.4006.UpdateContractStateService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10081",
                                "type":"",
                                "name":"付款后的状态反馈接口",
                                "code":"40.4006.paymentInterFaceService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10115",
                                "type":"",
                                "name":"商务_订单收货信息接口服务",
                                "code":"40.4006.receiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10767",
                                "type":"",
                                "name":"合同_商务_合同信息下发",
                                "code":"40.4006.UpdateContractService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10468",
                                "type":"",
                                "name":"认证平台_主数据_项目状态信息",
                                "code":"40.4006.MDMPROJECTSSTATES",
                                "children":[

                                ]
                            },
                            {
                                "id":"10887",
                                "type":"",
                                "name":"商务认证_商务交易_取消订单打标接口",
                                "code":"40.4006.CancelOrderService",
                                "children":[

                                ]
                            },
                            {
                                "id":"12030",
                                "type":"",
                                "name":"新主数据_认证_推送物资编码信息",
                                "code":"40.4006.productCodeDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12031",
                                "type":"",
                                "name":"新主数据_认证_推送服务编码信息",
                                "code":"40.4006.serviceCodeDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12085",
                                "type":"",
                                "name":"交易_认证_商城、仓储订单接口服务",
                                "code":"40.4006.PT_ORDERS",
                                "children":[

                                ]
                            },
                            {
                                "id":"11147",
                                "type":"",
                                "name":"商务交易_商务认证_评价信息推送",
                                "code":"40.4006.paramInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11173",
                                "type":"",
                                "name":"商务交易_商务认证_订单取消反馈接口",
                                "code":"40.4006.WebServiceApplyCooperateCancelResponse",
                                "children":[

                                ]
                            },
                            {
                                "id":"11319",
                                "type":"",
                                "name":"PDSS_商务认证_组织区域接口",
                                "code":"40.4006.GG_INTERFACE_ORG_REG_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11385",
                                "type":"",
                                "name":"商务交易_商务平台_采购需求接收接口",
                                "code":"40.4006.purDemandReceiveInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11395",
                                "type":"",
                                "name":"PDSS_商务平台_财务竣工决算接口",
                                "code":"40.4006.PDSSProjectSettlement",
                                "children":[

                                ]
                            },
                            {
                                "id":"12032",
                                "type":"",
                                "name":"认证_新主数据_供应商校验接口",
                                "code":"40.4006.checkSupplierAccountData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11785",
                                "type":"",
                                "name":"PMS_商合认证_非电商化采购合同信息查询",
                                "code":"40.4006.obpPurContInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11327",
                                "type":"",
                                "name":"财务_商务认证_正式竣工决算接口",
                                "code":"40.4006.finProjectsStatesService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11328",
                                "type":"",
                                "name":"财务_商务认证_正式竣工决算接口",
                                "code":"40.4006.finProjectsStates",
                                "children":[

                                ]
                            },
                            {
                                "id":"11306",
                                "type":"",
                                "name":"审计_商务平台_审计订单接收",
                                "code":"40.4006.auditOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11307",
                                "type":"",
                                "name":"审计_商务平台_审计结算",
                                "code":"40.4006.auditSettleInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11331",
                                "type":"",
                                "name":"审计_商务平台_审计项目状态接口",
                                "code":"40.4006.auditProjectsStates",
                                "children":[

                                ]
                            },
                            {
                                "id":"11340",
                                "type":"",
                                "name":"公共库_商务_合同信息",
                                "code":"40.4006.PDSSContractInfo",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2563",
                        "type":"",
                        "name":"OA系统",
                        "code":"40.4002",
                        "children":[
                            {
                                "id":"10167",
                                "type":"",
                                "name":"ces",
                                "code":"40.4002.ces",
                                "children":[

                                ]
                            },
                            {
                                "id":"10169",
                                "type":"",
                                "name":"OA_内部主帐号角色关系变更",
                                "code":"40.4002.updateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10171",
                                "type":"",
                                "name":"4A_内部主帐号角色关系变更同步",
                                "code":"40.4002.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10158",
                                "type":"",
                                "name":"sdfsd",
                                "code":"40.4002.23432",
                                "children":[

                                ]
                            },
                            {
                                "id":"10268",
                                "type":"",
                                "name":"M域_OA_组织部门合并",
                                "code":"40.4002.MDMBZDWBMDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10150",
                                "type":"",
                                "name":"4A_内部主帐号角色关系变更同步",
                                "code":"40.4002.AppAcctAuthorServices",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2565",
                        "type":"",
                        "name":"人力资源",
                        "code":"40.4008",
                        "children":[
                            {
                                "id":"10202",
                                "type":"",
                                "name":"HR_账号角色授权服务",
                                "code":"40.4008.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10203",
                                "type":"",
                                "name":"M域_HR_同步组织信息",
                                "code":"40.4008.MDMBZDWBMDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10201",
                                "type":"",
                                "name":"HR_账号变更服务",
                                "code":"40.4008.UpdateAppAcctSoap",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2543",
                        "type":"",
                        "name":"项目管理系统",
                        "code":"40.4004",
                        "children":[
                            {
                                "id":"10688",
                                "type":"",
                                "name":"CRM_PMS_室分类需求订单修改",
                                "code":"40.4004.updateRoomDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10111",
                                "type":"",
                                "name":"CRM_创新产品类需求订单提交",
                                "code":"40.4004.sendCreateDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10145",
                                "type":"",
                                "name":"主数据_同步人员类别信息",
                                "code":"40.4004.syncEmpKind",
                                "children":[

                                ]
                            },
                            {
                                "id":"10179",
                                "type":"",
                                "name":"M域_PMS_同步岗位信息",
                                "code":"40.4004.MDMZGJOB",
                                "children":[

                                ]
                            },
                            {
                                "id":"10180",
                                "type":"",
                                "name":"M域_PMS_同步兼职信息",
                                "code":"40.4004.MDMZGZDDUTY",
                                "children":[

                                ]
                            },
                            {
                                "id":"10182",
                                "type":"",
                                "name":"M域_PMS_同步人员信息",
                                "code":"40.4004.MDMZGZD",
                                "children":[

                                ]
                            },
                            {
                                "id":"10183",
                                "type":"",
                                "name":"M域_PMS_同步职务信息",
                                "code":"40.4004.MDMZW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10488",
                                "type":"",
                                "name":"商务_PMS_导入采购清单合价结果信息服务",
                                "code":"40.4004.importPurchaseListValenceInfoSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10506",
                                "type":"",
                                "name":"商务_PMS_采购清单取消接口",
                                "code":"40.4004.CancelPurchaseListInfoSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10547",
                                "type":"",
                                "name":"CRM_PMS_交付验收结果",
                                "code":"40.4004.deliveryAcceptance",
                                "children":[

                                ]
                            },
                            {
                                "id":"10575",
                                "type":"",
                                "name":"财务_PMS_决算信息推送接口",
                                "code":"40.4004.pushFinalInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10789",
                                "type":"",
                                "name":"MDM_PMS_站点信息合并",
                                "code":"40.4004.MDMZDXXHB",
                                "children":[

                                ]
                            },
                            {
                                "id":"10109",
                                "type":"",
                                "name":"CRM_项目完工通知",
                                "code":"40.4004.proFinishData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10110",
                                "type":"",
                                "name":"CRM_需求撤销",
                                "code":"40.4004.cancelDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10112",
                                "type":"",
                                "name":"CRM_传输类需求订单提交",
                                "code":"40.4004.sendTransDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10113",
                                "type":"",
                                "name":"CRM_室分类需求订单提交",
                                "code":"40.4004.sendRoomDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10114",
                                "type":"",
                                "name":"CRM_铁塔类需求订单提交",
                                "code":"40.4004.sendTowerDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10184",
                                "type":"",
                                "name":"M域_PMS_同步组织信息",
                                "code":"40.4004.MDMBZDWBMDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10143",
                                "type":"",
                                "name":"主数据_同步职务信息",
                                "code":"40.4004.syncDutyInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10144",
                                "type":"",
                                "name":"主数据_同步兼职信息",
                                "code":"40.4004.syncParttimeJob",
                                "children":[

                                ]
                            },
                            {
                                "id":"10181",
                                "type":"",
                                "name":"M域_PMS_同步人员类别信息",
                                "code":"40.4004.MDMRYLB",
                                "children":[

                                ]
                            },
                            {
                                "id":"10187",
                                "type":"",
                                "name":"M域_PMS_账号变更服务",
                                "code":"40.4004.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10188",
                                "type":"",
                                "name":"M域_PMS_帐号授权",
                                "code":"40.4004.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10140",
                                "type":"",
                                "name":"主数据_同步组织信息",
                                "code":"40.4004.syncOrgInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10141",
                                "type":"",
                                "name":"主数据_同步人员信息",
                                "code":"40.4004.syncEmpInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10142",
                                "type":"",
                                "name":"主数据_同步岗位信息",
                                "code":"40.4004.syncJobInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10492",
                                "type":"",
                                "name":"CRM_PMS_铁塔类需求订单变更",
                                "code":"40.4004.updateTowerDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10940",
                                "type":"",
                                "name":"商务_PMS_项目管理与商合增量修改接口",
                                "code":"40.4004.IncreUpdateEquSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"11807",
                                "type":"",
                                "name":"财务_PMS_QueryEpcDetailInfoService",
                                "code":"40.4004.QueryEpcDetailInfoService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11311",
                                "type":"",
                                "name":"PDSS_PMS_组织区域",
                                "code":"40.4004.GG_INTERFACE_ORG_REG_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11312",
                                "type":"",
                                "name":"CRM_PMS_订单变更接口",
                                "code":"40.4004.changeOrder",
                                "children":[

                                ]
                            },
                            {
                                "id":"11344",
                                "type":"",
                                "name":"RMS_PMS_站址业务问询接口",
                                "code":"40.4004.siteBusinessInquiries",
                                "children":[

                                ]
                            },
                            {
                                "id":"11687",
                                "type":"",
                                "name":"创新_项目管理_铁塔类创新试点需求订单提交",
                                "code":"40.4004.sendTowerInnovateDemandDataForInno",
                                "children":[

                                ]
                            },
                            {
                                "id":"11869",
                                "type":"",
                                "name":"CRM_PMS_拓展业务（室分）订单立项及修改",
                                "code":"40.4004.sendExRoomDemandDataService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11911",
                                "type":"",
                                "name":"新主数据_PMS_供应商信息推送接口",
                                "code":"40.4004.pushSupplierDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11374",
                                "type":"",
                                "name":"PDSS_PMS_公共库同步项目竣工决算信息给PMS",
                                "code":"40.4004.finalAccountInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11705",
                                "type":"",
                                "name":"创新_项目管理_创新试点项目获取项目状态信息",
                                "code":"40.4004.getProjectStateForInno",
                                "children":[

                                ]
                            },
                            {
                                "id":"11433",
                                "type":"",
                                "name":"crm_pms_非标类铁塔需求订单修改",
                                "code":"40.4004.UpdateSpecTowerDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11434",
                                "type":"",
                                "name":"crm_pms_微站类含点位信息需求订单提交",
                                "code":"40.4004.SendNewSmallStationData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11435",
                                "type":"",
                                "name":"crm_pms_微站类含点位信息需求订单修改",
                                "code":"40.4004.UpdateNewSmallStationData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11829",
                                "type":"",
                                "name":"CRM_PMS_微站点位变更请求及取消",
                                "code":"40.4004.UpdateNewSmallStationState",
                                "children":[

                                ]
                            },
                            {
                                "id":"11301",
                                "type":"",
                                "name":"商城_PMS_订单收货信息接口服务",
                                "code":"40.4004.receiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11370",
                                "type":"",
                                "name":"CRM_PMS_小微站类需求订单提交",
                                "code":"40.4004.sendSmallStationDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11206",
                                "type":"",
                                "name":"审计_PMS_审计退回PMS工程项目服务",
                                "code":"40.4004.UpdatePrjPush",
                                "children":[

                                ]
                            },
                            {
                                "id":"11292",
                                "type":"",
                                "name":"CRM_PMS_新业务需求订单提交",
                                "code":"40.4004.sendNewBusinessData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11906",
                                "type":"",
                                "name":"CRM_PMS_拓展业务（室分）订单立项及修改",
                                "code":"40.4004.queryProjectStartTime",
                                "children":[

                                ]
                            },
                            {
                                "id":"11229",
                                "type":"",
                                "name":"审计_PMS_送审退回PMS工程项目服务",
                                "code":"40.4004.UpdateAuditReturn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11253",
                                "type":"",
                                "name":"CRM_PMS_特殊铁塔类需求订单提交",
                                "code":"40.4004.sendSpecTowerDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11291",
                                "type":"",
                                "name":"商务_PMS_同步服务区域信息",
                                "code":"40.4004.ReceiveTRegion",
                                "children":[

                                ]
                            },
                            {
                                "id":"11293",
                                "type":"",
                                "name":"CRM_PMS_新业务需求订单修改",
                                "code":"40.4004.UpdateNewBusinessData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11371",
                                "type":"",
                                "name":"CRM_PMS_小微站类需求订单修改",
                                "code":"40.4004.UpdateSmallStationData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11375",
                                "type":"",
                                "name":"PDSS_PMS_同步项目竣工决算信息",
                                "code":"40.4004.PDSSProjectSettlement",
                                "children":[

                                ]
                            },
                            {
                                "id":"11885",
                                "type":"",
                                "name":"CRM_PMS_拓展业务（室分）订单立项修改",
                                "code":"40.4004.sendExRoomDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11176",
                                "type":"",
                                "name":"公共库_PMS_接收站址同步",
                                "code":"40.4004.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11257",
                                "type":"",
                                "name":"审计_PMS_决算退回PMS工程项目服务",
                                "code":"40.4004.UpdateFinInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11265",
                                "type":"",
                                "name":"商合_PMS_同步服务商信息",
                                "code":"40.4004.receiveTProvider",
                                "children":[

                                ]
                            },
                            {
                                "id":"11266",
                                "type":"",
                                "name":"运营商门户_PMS_站点编码查询站点上是否有在建项目",
                                "code":"40.4004.checkProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11267",
                                "type":"",
                                "name":"RMS_PMS_站点编码查询站点上是否有在建项目",
                                "code":"40.4004.checkIsHaveProject",
                                "children":[

                                ]
                            },
                            {
                                "id":"11309",
                                "type":"",
                                "name":"审计_PMS_审计调用PMS修改结算送审状态",
                                "code":"40.4004.UpdatePushAuditState",
                                "children":[

                                ]
                            },
                            {
                                "id":"11341",
                                "type":"",
                                "name":"PDSS_PMS_站址业务判断",
                                "code":"40.4004.projectExists",
                                "children":[

                                ]
                            },
                            {
                                "id":"11345",
                                "type":"",
                                "name":"RMS_PMS_站址业务问询接口",
                                "code":"40.4004.siteBusinesslnquiries",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2564",
                        "type":"",
                        "name":"4A系统",
                        "code":"40.4007",
                        "children":[
                            {
                                "id":"10706",
                                "type":"",
                                "name":"财务_4A_财务组织机构",
                                "code":"40.4007.UpdateAppOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"10941",
                                "type":"",
                                "name":"4A_添加组织",
                                "code":"40.4007.addOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"10943",
                                "type":"",
                                "name":"4A_删除组织",
                                "code":"40.4007.deleteOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"10945",
                                "type":"",
                                "name":"4A_编辑组织",
                                "code":"40.4007.modifyOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"10946",
                                "type":"",
                                "name":"4A_编辑用户",
                                "code":"40.4007.modifyUser",
                                "children":[

                                ]
                            },
                            {
                                "id":"11066",
                                "type":"",
                                "name":"运营商门户_4A_添加用户",
                                "code":"40.4007.addUserNew",
                                "children":[

                                ]
                            },
                            {
                                "id":"10148",
                                "type":"",
                                "name":"统一票据验证接口",
                                "code":"40.4007.CheckAiuapTokenSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10186",
                                "type":"",
                                "name":"M域_4A_主账号认证鉴权接口",
                                "code":"40.4007.QueryMainAcctPermissionService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10146",
                                "type":"",
                                "name":"组织机构的增删改",
                                "code":"40.4007.UpdateAppOrgServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10147",
                                "type":"",
                                "name":"角色增删改",
                                "code":"40.4007.UpdateAppPermissionServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10149",
                                "type":"",
                                "name":"统一票据申请接口",
                                "code":"40.4007.CreateAiuapTokenSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10806",
                                "type":"",
                                "name":"财务_4A_统一票据申请接口",
                                "code":"40.4007.CreateAiuapToken",
                                "children":[

                                ]
                            },
                            {
                                "id":"10942",
                                "type":"",
                                "name":"4A_添加用户",
                                "code":"40.4007.addUser",
                                "children":[

                                ]
                            },
                            {
                                "id":"10944",
                                "type":"",
                                "name":"4A_删除用户",
                                "code":"40.4007.deleteUser",
                                "children":[

                                ]
                            },
                            {
                                "id":"10867",
                                "type":"",
                                "name":"财务_4A_统一票据验证接口",
                                "code":"40.4007.CheckAiuapToken",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2605",
                        "type":"",
                        "name":"审计系统",
                        "code":"40.4010",
                        "children":[
                            {
                                "id":"10847",
                                "type":"",
                                "name":"PMS_审计_接收项目管理项目信息服务",
                                "code":"40.4010.getPrjInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10849",
                                "type":"",
                                "name":"4A_审计_账号变更服务",
                                "code":"40.4010.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10848",
                                "type":"",
                                "name":"4A_审计_账号角色授权服务",
                                "code":"40.4010.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11380",
                                "type":"",
                                "name":"财务_审计_付款状态反馈接口",
                                "code":"40.4010.paymentStatusService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11625",
                                "type":"",
                                "name":"公共库_审计_公共库推送站址信息到审计系统",
                                "code":"40.4010.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11429",
                                "type":"",
                                "name":"公共数据库_审计_项目状态信息接口",
                                "code":"40.4010.PDSSProjectStatus",
                                "children":[

                                ]
                            },
                            {
                                "id":"12028",
                                "type":"",
                                "name":"新主数据_审计_推送物资编码信息",
                                "code":"40.4010.productCodeDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12029",
                                "type":"",
                                "name":"新主数据_审计_推送服务编码信息",
                                "code":"40.4010.serviceCodeDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11566",
                                "type":"",
                                "name":"财务_审计_财务推送列帐红冲状态",
                                "code":"40.4010.accountsSterilisationState",
                                "children":[

                                ]
                            },
                            {
                                "id":"11388",
                                "type":"",
                                "name":"PMS_审计_查询项目是否出具审签单",
                                "code":"40.4010.QueryProjectState",
                                "children":[

                                ]
                            },
                            {
                                "id":"11910",
                                "type":"",
                                "name":"新主数据_审计_供应商信息推送接口",
                                "code":"40.4010.pushSupplierDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11438",
                                "type":"",
                                "name":"财务_审计_M域_CW_回传新旧项目标识接口",
                                "code":"40.4010.ReturnProjectFlag",
                                "children":[

                                ]
                            },
                            {
                                "id":"11468",
                                "type":"",
                                "name":"财务_审计_财务调用审计查询审定金额信息接口",
                                "code":"40.4010.ReturnAuditAmountInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11227",
                                "type":"",
                                "name":"PMS_审计_PMS决算送往审计项目服务接口",
                                "code":"40.4010.getTcpInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11228",
                                "type":"",
                                "name":"商务_审计_订单收货信息接口服务",
                                "code":"40.4010.receiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11867",
                                "type":"",
                                "name":"公共库_审计_公共库推送项目基础信息到审计系统",
                                "code":"40.4010.PDSSProjectInfo",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2547",
                        "type":"",
                        "name":"合同管理系统",
                        "code":"40.4003",
                        "children":[
                            {
                                "id":"10240",
                                "type":"",
                                "name":"M域_合同_账号角色授权服务",
                                "code":"40.4003.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10489",
                                "type":"",
                                "name":"物业_合同_物业推送合同草稿接口",
                                "code":"40.4003.InsertContractDraftService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10266",
                                "type":"",
                                "name":"M域_合同_组织部门合并",
                                "code":"40.4003.MDMBZDWBMDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10808",
                                "type":"",
                                "name":"财务_合同_付款装状态信息接口",
                                "code":"40.4003.paymentStatusService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10239",
                                "type":"",
                                "name":"M域_合同_账号变更服务",
                                "code":"40.4003.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10248",
                                "type":"",
                                "name":"M域_合同_客商接口",
                                "code":"40.4003.MDMWLDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10306",
                                "type":"",
                                "name":"M域_合同_合同下发接口",
                                "code":"40.4003.dowithData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10926",
                                "type":"",
                                "name":"商务_合同_订单结算接口服务",
                                "code":"40.4003.settleOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10927",
                                "type":"",
                                "name":"商务_合同_订单收货信息接口",
                                "code":"40.4003.receiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11338",
                                "type":"",
                                "name":"RMS_合同_站址业务问询接口",
                                "code":"40.4003.siteBusinessInquiries",
                                "children":[

                                ]
                            },
                            {
                                "id":"11845",
                                "type":"",
                                "name":"物业_合同_合同信息查询",
                                "code":"40.4003.ContractSearchService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11503",
                                "type":"",
                                "name":"公共库_合同_枚举值推送接口",
                                "code":"40.4003.ggkenumPush",
                                "children":[

                                ]
                            },
                            {
                                "id":"11439",
                                "type":"",
                                "name":"商合_合同_合同草稿删除接口",
                                "code":"40.4003.DeleteContractDraftService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11912",
                                "type":"",
                                "name":"新主数据_合同_供应商接口",
                                "code":"40.4003.pushSupplierDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11339",
                                "type":"",
                                "name":"公共库_合同_组织区域接口",
                                "code":"40.4003.GG_INTERFACE_ORG_REG_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11868",
                                "type":"",
                                "name":"物业_合同_合同系统角色的人员列表查询接口",
                                "code":"40.4003.ContractSysListEmployeesByRoleService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11226",
                                "type":"",
                                "name":"公共库_合同_接收站址同步",
                                "code":"40.4003.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11324",
                                "type":"",
                                "name":"物业_合同_接收物业处理结果接口",
                                "code":"40.4003.GetResultByWyService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11421",
                                "type":"",
                                "name":"财务_合同_付款信息接口",
                                "code":"40.4003.PaymentInfoService",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2566",
                        "type":"",
                        "name":"资产管理",
                        "code":"40.4005",
                        "children":[
                            {
                                "id":"10230",
                                "type":"",
                                "name":"M域_资产_帐号授权",
                                "code":"40.4005.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10206",
                                "type":"",
                                "name":"4A_账号变更服务",
                                "code":"40.4005.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10205",
                                "type":"",
                                "name":"4A_资产_账号变更服务",
                                "code":"40.4005.updateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11492",
                                "type":"",
                                "name":"公共库_资产_枚举值接口",
                                "code":"40.4005.enumService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11496",
                                "type":"",
                                "name":"公共库_资产管理_枚举值接口",
                                "code":"40.4005.enumController",
                                "children":[

                                ]
                            },
                            {
                                "id":"11501",
                                "type":"",
                                "name":"公共库_资产_枚举值接口1",
                                "code":"40.4005.enumControllerPlan",
                                "children":[

                                ]
                            },
                            {
                                "id":"11505",
                                "type":"",
                                "name":"公共库_资产_枚举值接口121",
                                "code":"40.4005.ggkenumPush",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2825",
                        "type":"",
                        "name":"商务交易平台",
                        "code":"40.4011",
                        "children":[
                            {
                                "id":"11117",
                                "type":"",
                                "name":"MDM_商务交易平台_项目信息",
                                "code":"40.4011.MDMPROJECTS",
                                "children":[

                                ]
                            },
                            {
                                "id":"11118",
                                "type":"",
                                "name":"MDM_商务交易平台_项目状态信息",
                                "code":"40.4011.MDMPROJECTSSTATES",
                                "children":[

                                ]
                            },
                            {
                                "id":"11127",
                                "type":"",
                                "name":"商务认证_商务交易平台_稽核申请协同作废接口",
                                "code":"40.4011.applyCooperateCancel",
                                "children":[

                                ]
                            },
                            {
                                "id":"11357",
                                "type":"",
                                "name":"财务_商务交易平台_订单校验信息反馈接口",
                                "code":"40.4011.fedBackOrderCheckInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11386",
                                "type":"",
                                "name":"商务认证_商务交易_传统采购信息服务",
                                "code":"40.4011.saveOfflinePurchase",
                                "children":[

                                ]
                            },
                            {
                                "id":"11985",
                                "type":"",
                                "name":"PMS_交易_设计费及监理费",
                                "code":"40.4011.sendDgAndSpFromPmsForPh",
                                "children":[

                                ]
                            },
                            {
                                "id":"11295",
                                "type":"",
                                "name":"审计_商务交易平台_导入决算审计结果服务",
                                "code":"40.4011.ImportAuditResultsSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"11308",
                                "type":"",
                                "name":"审计/财务_商务交易平台_查询项目采购信息服务",
                                "code":"40.4011.inqueryProjectOrderList",
                                "children":[

                                ]
                            },
                            {
                                "id":"11377",
                                "type":"",
                                "name":"仓储_商务交易平台_更新待补采出库需求单信息",
                                "code":"40.4011.modifyOutputDemandInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11270",
                                "type":"",
                                "name":"仓储_商务交易平台_更新出库需求单信息服务",
                                "code":"40.4011.updateOutputDemandBillInfoSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"11281",
                                "type":"",
                                "name":"仓储_商务交易平台_查询出库通知单信息服务",
                                "code":"40.4011.inqueryOutputNoticeInfoSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"11298",
                                "type":"",
                                "name":"M域_商务交易平台_订单(项目设计清单)收货状态接口",
                                "code":"40.4011.RCVSTATES",
                                "children":[

                                ]
                            },
                            {
                                "id":"11168",
                                "type":"",
                                "name":"PMS_商务交易平台_采购清单是否撤回查询接口",
                                "code":"40.4011.QueryPurchaseListIsBackInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11271",
                                "type":"",
                                "name":"仓储_商务交易平台_查询库存交易记录信息服务",
                                "code":"40.4011.inqueryTransactionInfoSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"11272",
                                "type":"",
                                "name":"仓储_商务交易平台_查询入库通知单信息服务",
                                "code":"40.4011.process",
                                "children":[

                                ]
                            },
                            {
                                "id":"11318",
                                "type":"",
                                "name":"仓储_商务交易平台_更新出库需求单信息服务",
                                "code":"40.4011.updateRefundApplyInfoSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"11988",
                                "type":"",
                                "name":"财务_交易_设计监理校验接口",
                                "code":"40.4011.verifyPurchaseDesign",
                                "children":[

                                ]
                            },
                            {
                                "id":"11269",
                                "type":"",
                                "name":"仓储_商务交易平台_更新采购订单信息服务",
                                "code":"40.4011.updateOrderBillInfoSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"11310",
                                "type":"",
                                "name":"仓储_商务交易平台_仓储系统退库接口服务",
                                "code":"40.4011.returnProductInComing",
                                "children":[

                                ]
                            },
                            {
                                "id":"11323",
                                "type":"",
                                "name":"审计_商务交易平台_审计结算",
                                "code":"40.4011.auditOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11343",
                                "type":"",
                                "name":"资源_商务交易_站址业务判断",
                                "code":"40.4011.siteBusinessInquiries",
                                "children":[

                                ]
                            },
                            {
                                "id":"11264",
                                "type":"",
                                "name":"PMS_商务交易平台_销项冻结/解冻采购任务服务",
                                "code":"40.4011.increUpdateES",
                                "children":[

                                ]
                            },
                            {
                                "id":"11283",
                                "type":"",
                                "name":"仓储_商务交易平台_查询出库通知单信息服务",
                                "code":"40.4011.inqueryOutputNoticeInfoProcess",
                                "children":[

                                ]
                            },
                            {
                                "id":"11326",
                                "type":"",
                                "name":"商务认证_商务交易平台_商品图片数据推送接口",
                                "code":"40.4011.GoodsImgInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11329",
                                "type":"",
                                "name":"PDSS_商务交易_组织区域接口",
                                "code":"40.4011.GG_INTERFACE_ORG_REG_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11330",
                                "type":"",
                                "name":"仓储_商务交易平台_待补采清单数据推送",
                                "code":"40.4011.dealSupplementPurchaseDemand",
                                "children":[

                                ]
                            },
                            {
                                "id":"11332",
                                "type":"",
                                "name":"资源_商务交易平台_站址业务判断接口",
                                "code":"40.4011.judgeSiteIncome",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2889",
                        "type":"",
                        "name":"档案管理系统",
                        "code":"40.4013",
                        "children":[
                            {
                                "id":"11382",
                                "type":"",
                                "name":"公共库_档案_项目信息同步接口",
                                "code":"40.4013.PDSSProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11406",
                                "type":"",
                                "name":"物业_档案_FTP文件交互",
                                "code":"40.4013.ftpFilesMutual",
                                "children":[

                                ]
                            },
                            {
                                "id":"11379",
                                "type":"",
                                "name":"公共库_档案_接受站址同步",
                                "code":"40.4013.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11303",
                                "type":"",
                                "name":"4A_档案_账号变更服务",
                                "code":"40.4013.UpdateAppAcctSoap",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2925",
                        "type":"",
                        "name":"新4A",
                        "code":"40.4015",
                        "children":[
                            {
                                "id":"11749",
                                "type":"",
                                "name":"M域_新4A_统一票据申请接口",
                                "code":"40.4015.CreateAiuapTokenSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11752",
                                "type":"",
                                "name":"M域_新4A_角色变更接口",
                                "code":"40.4015.UpdateAppPermissionServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11920",
                                "type":"",
                                "name":"财务_新4A_组织变更",
                                "code":"40.4015.UpdateAppOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"11930",
                                "type":"",
                                "name":"门户_新4A_添加用户",
                                "code":"40.4015.addUser",
                                "children":[

                                ]
                            },
                            {
                                "id":"11932",
                                "type":"",
                                "name":"门户_新4A_删除用户",
                                "code":"40.4015.deleteUser",
                                "children":[

                                ]
                            },
                            {
                                "id":"11933",
                                "type":"",
                                "name":"门户_新4A_添加组织",
                                "code":"40.4015.addOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"11934",
                                "type":"",
                                "name":"门户_新4A_编辑组织",
                                "code":"40.4015.modifyOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"11935",
                                "type":"",
                                "name":"门户_新4A_删除组织",
                                "code":"40.4015.deleteOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"11748",
                                "type":"",
                                "name":"M域_新4A_统一票据验证接口",
                                "code":"40.4015.CheckAiuapTokenSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11928",
                                "type":"",
                                "name":"OA_新4A_主帐号密码修改接口",
                                "code":"40.4015.ModifyMainAcctPwdForSDService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11747",
                                "type":"",
                                "name":"M域_新4A_统一票据申请接口",
                                "code":"40.4015.M域_4A_统一票据申请接口",
                                "children":[

                                ]
                            },
                            {
                                "id":"11750",
                                "type":"",
                                "name":"M域_新4A_财务组织机构",
                                "code":"40.4015.UpdateAppOrgServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11751",
                                "type":"",
                                "name":"M域_新4A_主账号认证鉴权接口",
                                "code":"40.4015.QueryMainAcctPermissionService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11937",
                                "type":"",
                                "name":"财务_新4A_统一票据验证接口",
                                "code":"40.4015.CheckAiuapToken",
                                "children":[

                                ]
                            },
                            {
                                "id":"11931",
                                "type":"",
                                "name":"门户_新4A_编辑用户",
                                "code":"40.4015.modifyUser",
                                "children":[

                                ]
                            },
                            {
                                "id":"11936",
                                "type":"",
                                "name":"财务_新4A_财务票据申请",
                                "code":"40.4015.CreateAiuapToken",
                                "children":[

                                ]
                            },
                            {
                                "id":"11929",
                                "type":"",
                                "name":"OA_新4A_手机号码变更接口",
                                "code":"40.4015.UpdateMobileServices",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2883",
                        "type":"",
                        "name":"仓储管理平台",
                        "code":"40.4012",
                        "children":[
                            {
                                "id":"11273",
                                "type":"",
                                "name":"商务交易平台_仓储_查询入库通知单信息服务",
                                "code":"40.4012.process",
                                "children":[

                                ]
                            },
                            {
                                "id":"11297",
                                "type":"",
                                "name":"财务_仓储_入库通知单信息服务",
                                "code":"40.4012.CWProcess",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"2544",
                "type":"",
                "name":"test测试",
                "code":"60",
                "children":[
                    {
                        "id":"2545",
                        "type":"",
                        "name":"主数据",
                        "code":"60.6001",
                        "children":[
                            {
                                "id":"10087",
                                "type":"",
                                "name":"财务系统_往来单位信息接口",
                                "code":"60.6001.wldwxxjson",
                                "children":[

                                ]
                            },
                            {
                                "id":"10238",
                                "type":"",
                                "name":"MDM_站点信息测试",
                                "code":"60.6001.site",
                                "children":[

                                ]
                            },
                            {
                                "id":"10232",
                                "type":"",
                                "name":"MDM_主数据与物业单独人员信息接口",
                                "code":"60.6001.PCMSMDMInterfaceJsons",
                                "children":[

                                ]
                            },
                            {
                                "id":"10529",
                                "type":"",
                                "name":"MDM_物业上传主数据",
                                "code":"60.6001.PCMSMDMInterfaceJson",
                                "children":[

                                ]
                            },
                            {
                                "id":"10086",
                                "type":"",
                                "name":"财务系统_接收地区信息",
                                "code":"60.6001.dqxxjson",
                                "children":[

                                ]
                            },
                            {
                                "id":"10234",
                                "type":"",
                                "name":"主数据_主数据下发组织部门合并测试",
                                "code":"60.6001.MDMOrganization",
                                "children":[

                                ]
                            },
                            {
                                "id":"10173",
                                "type":"",
                                "name":"MDM_主数据数据接收统一调用接口",
                                "code":"60.6001.MDMInterfaceJson",
                                "children":[

                                ]
                            },
                            {
                                "id":"10106",
                                "type":"",
                                "name":"财务系统_往来单位信息接口",
                                "code":"60.6001.MDMWLDW",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2823",
                        "type":"",
                        "name":"公共数据库",
                        "code":"60.6002",
                        "children":[
                            {
                                "id":"11106",
                                "type":"",
                                "name":"公共库公共调用方法",
                                "code":"60.6002.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11607",
                                "type":"",
                                "name":"审计_公共库_录入审计系统项目信息接口",
                                "code":"60.6002.inputAuditingProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11467",
                                "type":"",
                                "name":"审计crm_公共库_公共库枚举值查询接口",
                                "code":"60.6002.queryenumSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11765",
                                "type":"",
                                "name":"CRM_公共库_CRM系统发送合并订单和订单的关系接口",
                                "code":"60.6002.inputMergeOrderAndOrderRelationInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11313",
                                "type":"",
                                "name":"PMS_PDSS_PMS同步项目基础信息给公共库",
                                "code":"60.6002.PDSSProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11315",
                                "type":"",
                                "name":"合同_PDSS_合同系统同步合同信息给公共库",
                                "code":"60.6002.PDSSContractInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11686",
                                "type":"",
                                "name":"资源_公共库_站址存量补录接口",
                                "code":"60.6002.AddStationStockSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11786",
                                "type":"",
                                "name":"统一_公共库_查询项目建设进度接口",
                                "code":"60.6002.QueryProjectConstructionSchedule",
                                "children":[

                                ]
                            },
                            {
                                "id":"11314",
                                "type":"",
                                "name":"PMS_PDSS_PMS同步项目状态信息给公共库",
                                "code":"60.6002.PDSSProjectStatus",
                                "children":[

                                ]
                            },
                            {
                                "id":"11393",
                                "type":"",
                                "name":"选址_PDSS_公共库反馈选址系统合同站址关联信息",
                                "code":"60.6002.PDSSReturnContract",
                                "children":[

                                ]
                            },
                            {
                                "id":"11426",
                                "type":"",
                                "name":"公共库_crmpms_站址信息查询接口",
                                "code":"60.6002.querySiteInfoSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11685",
                                "type":"",
                                "name":"商务交易_公共库_根据项目编码查询项目基础信息接口",
                                "code":"60.6002.QueryProjectInfoSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11378",
                                "type":"",
                                "name":"M域_PDSS_客商信息",
                                "code":"60.6002.PDSSBusinessInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11430",
                                "type":"",
                                "name":"公共库_crm_pms_站址信息查询接口",
                                "code":"60.6002.deleteStationsSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11366",
                                "type":"",
                                "name":"RMS_PDSS_机房接口",
                                "code":"60.6002.PDSSRoomInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11367",
                                "type":"",
                                "name":"RMS_PDSS_铁塔接口",
                                "code":"60.6002.PDSSTowerInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11373",
                                "type":"",
                                "name":"M域_PDSS_站址有效性校验接口",
                                "code":"60.6002.siteValidityCheck",
                                "children":[

                                ]
                            },
                            {
                                "id":"11412",
                                "type":"",
                                "name":"PDSS_站址状态变更接口",
                                "code":"60.6002.updateStationsSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11413",
                                "type":"",
                                "name":"PDSS_站址申请新增接口",
                                "code":"60.6002.PDSSStationGenerateCode",
                                "children":[

                                ]
                            },
                            {
                                "id":"11502",
                                "type":"",
                                "name":"crm_公共库_站址信息查询接口",
                                "code":"60.6002.queryProjectStateInfoSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11187",
                                "type":"",
                                "name":"财务_公共库",
                                "code":"60.6002.GG_INTERFACE_SynCW",
                                "children":[

                                ]
                            },
                            {
                                "id":"11255",
                                "type":"",
                                "name":"RMS_PDSS_上传公共库接口",
                                "code":"60.6002.PDSSInterface",
                                "children":[

                                ]
                            },
                            {
                                "id":"11316",
                                "type":"",
                                "name":"CRM_PDSS_CRM系统同步订单信息给公共库",
                                "code":"60.6002.PDSSOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11354",
                                "type":"",
                                "name":"RMS_PDSS_站址业务判断接口",
                                "code":"60.6002.siteBusinessInquiries",
                                "children":[

                                ]
                            },
                            {
                                "id":"11376",
                                "type":"",
                                "name":"财务_PDSS_同步项目竣工决算信息",
                                "code":"60.6002.PDSSProjectSettlement",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2985",
                        "type":"",
                        "name":"新主数据",
                        "code":"60.6003",
                        "children":[
                            {
                                "id":"11907",
                                "type":"",
                                "name":"认证_新主数据_新增/修改供应商接口",
                                "code":"60.6003.modifySupplierDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11908",
                                "type":"",
                                "name":"PMS审计_新主数据_供应商(精确查询)接口",
                                "code":"60.6003.querySupplierDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12033",
                                "type":"",
                                "name":"认证_新主数据_供应商校验接口",
                                "code":"60.6003.checkSupplierAccountData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11909",
                                "type":"",
                                "name":"PMS审计_新主数据_供应商(模糊查询)接口",
                                "code":"60.6003.querySupplierDataInfoByLike",
                                "children":[

                                ]
                            },
                            {
                                "id":"12006",
                                "type":"",
                                "name":"新主数据_PMS_服务编码",
                                "code":"60.6003.serviceCodeDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12007",
                                "type":"",
                                "name":"新主数据_PMS_物资编码",
                                "code":"60.6003.productCodeDataInfo",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"2483",
                "type":"",
                "name":"ESB平台域",
                "code":"00",
                "children":[
                    {
                        "id":"2484",
                        "type":"",
                        "name":"综合测试系统TS",
                        "code":"00.0001",
                        "children":[
                            {
                                "id":"10134",
                                "type":"",
                                "name":"wdad",
                                "code":"00.0001.asdas",
                                "children":[

                                ]
                            },
                            {
                                "id":"10286",
                                "type":"",
                                "name":"组织部门合并同步测试平台",
                                "code":"00.0001.orgTest",
                                "children":[

                                ]
                            },
                            {
                                "id":"10546",
                                "type":"",
                                "name":"test_asyn",
                                "code":"00.0001.test_asyn",
                                "children":[

                                ]
                            },
                            {
                                "id":"10906",
                                "type":"",
                                "name":"ESB同步标准服务测试",
                                "code":"00.0001.normalHandle",
                                "children":[

                                ]
                            },
                            {
                                "id":"10908",
                                "type":"",
                                "name":"esbTest",
                                "code":"00.0001.normal",
                                "children":[

                                ]
                            },
                            {
                                "id":"10090",
                                "type":"",
                                "name":"接收订单信息并保存",
                                "code":"00.0001.ReceiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10104",
                                "type":"",
                                "name":"接受订单信息保存测试",
                                "code":"00.0001.ReceiveOrderInfo1",
                                "children":[

                                ]
                            },
                            {
                                "id":"10001",
                                "type":"",
                                "name":"ESB平台测试异步标准服务-TS002",
                                "code":"00.0001.testService002_async",
                                "children":[

                                ]
                            },
                            {
                                "id":"10040",
                                "type":"",
                                "name":"M域_CW_接收订单到货信息服务",
                                "code":"00.0001.M_CW_ReceiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10121",
                                "type":"",
                                "name":"测试",
                                "code":"00.0001.test",
                                "children":[

                                ]
                            },
                            {
                                "id":"10139",
                                "type":"",
                                "name":"郭亮_订单收获信息接口",
                                "code":"00.0001.guoliang_receive_order",
                                "children":[

                                ]
                            },
                            {
                                "id":"10199",
                                "type":"",
                                "name":"商务平台_订单收获信息",
                                "code":"00.0001.receiveOrderInfo12",
                                "children":[

                                ]
                            },
                            {
                                "id":"10527",
                                "type":"",
                                "name":"ESB_TEST_0001",
                                "code":"00.0001.ESB_TEST_0001",
                                "children":[

                                ]
                            },
                            {
                                "id":"10528",
                                "type":"",
                                "name":"TEST_CREATE_0001",
                                "code":"00.0001.001",
                                "children":[

                                ]
                            },
                            {
                                "id":"10000",
                                "type":"",
                                "name":"ESB平台测试同步标准服务-TS001",
                                "code":"00.0001.testService001_sync",
                                "children":[

                                ]
                            },
                            {
                                "id":"10088",
                                "type":"",
                                "name":"CRM测试接口",
                                "code":"00.0001.getGreeting",
                                "children":[

                                ]
                            },
                            {
                                "id":"10117",
                                "type":"",
                                "name":"流程测试标准服务f01",
                                "code":"00.0001.serviceFlow01",
                                "children":[

                                ]
                            },
                            {
                                "id":"10120",
                                "type":"",
                                "name":"流程测试1",
                                "code":"00.0001.SYNC1V1",
                                "children":[

                                ]
                            },
                            {
                                "id":"10123",
                                "type":"",
                                "name":"郭亮并行测试",
                                "code":"00.0001.guoliang",
                                "children":[

                                ]
                            },
                            {
                                "id":"10888",
                                "type":"",
                                "name":"站点同步测试",
                                "code":"00.0001.siteInfomation",
                                "children":[

                                ]
                            },
                            {
                                "id":"10909",
                                "type":"",
                                "name":"ESB同步测试",
                                "code":"00.0001.handler",
                                "children":[

                                ]
                            },
                            {
                                "id":"10020",
                                "type":"",
                                "name":"aaaaaa",
                                "code":"00.0001.serviceaaaa_sync",
                                "children":[

                                ]
                            },
                            {
                                "id":"10138",
                                "type":"",
                                "name":"CRM_财务系统_esb",
                                "code":"00.0001.testservice",
                                "children":[

                                ]
                            },
                            {
                                "id":"10189",
                                "type":"",
                                "name":"测试一_订单收获信息接口",
                                "code":"00.0001.receiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10526",
                                "type":"",
                                "name":"查询工单详情",
                                "code":"00.0001.201508101",
                                "children":[

                                ]
                            },
                            {
                                "id":"10574",
                                "type":"",
                                "name":"测试服务编排1",
                                "code":"00.0001.combine_service",
                                "children":[

                                ]
                            },
                            {
                                "id":"10907",
                                "type":"",
                                "name":"ESB测试normalHandle",
                                "code":"00.0001.one",
                                "children":[

                                ]
                            },
                            {
                                "id":"10102",
                                "type":"",
                                "name":"CRM_getGreeting",
                                "code":"00.0001.getGreeting1",
                                "children":[

                                ]
                            },
                            {
                                "id":"10122",
                                "type":"",
                                "name":"test1",
                                "code":"00.0001.test1",
                                "children":[

                                ]
                            },
                            {
                                "id":"10287",
                                "type":"",
                                "name":"同步测试",
                                "code":"00.0001.orgtest",
                                "children":[

                                ]
                            },
                            {
                                "id":"10288",
                                "type":"",
                                "name":"同步测试",
                                "code":"00.0001.tbtest",
                                "children":[

                                ]
                            },
                            {
                                "id":"10568",
                                "type":"",
                                "name":"test_niosocket",
                                "code":"00.0001.test_niosocket",
                                "children":[

                                ]
                            },
                            {
                                "id":"11725",
                                "type":"",
                                "name":"测试testtest",
                                "code":"00.0001.testtestaaa",
                                "children":[

                                ]
                            },
                            {
                                "id":"11826",
                                "type":"",
                                "name":"测试队列",
                                "code":"00.0001.testqueue",
                                "children":[

                                ]
                            },
                            {
                                "id":"11825",
                                "type":"",
                                "name":"队列测试",
                                "code":"00.0001.queuetest",
                                "children":[

                                ]
                            },
                            {
                                "id":"11706",
                                "type":"",
                                "name":"测试",
                                "code":"00.0001.aaaatest",
                                "children":[

                                ]
                            },
                            {
                                "id":"11707",
                                "type":"",
                                "name":"cesh",
                                "code":"00.0001.bbbtest",
                                "children":[

                                ]
                            },
                            {
                                "id":"11408",
                                "type":"",
                                "name":"测试File文件转发模拟器标准服务_001",
                                "code":"00.0001.fileService_001",
                                "children":[

                                ]
                            },
                            {
                                "id":"11827",
                                "type":"",
                                "name":"测试test",
                                "code":"00.0001.testbiz",
                                "children":[

                                ]
                            },
                            {
                                "id":"11828",
                                "type":"",
                                "name":"测试326",
                                "code":"00.0001.test326",
                                "children":[

                                ]
                            },
                            {
                                "id":"11846",
                                "type":"",
                                "name":"测试test测试",
                                "code":"00.0001.test6test",
                                "children":[

                                ]
                            },
                            {
                                "id":"11166",
                                "type":"",
                                "name":"ESB异步测试",
                                "code":"00.0001.yibu",
                                "children":[

                                ]
                            },
                            {
                                "id":"11369",
                                "type":"",
                                "name":"测试1.1业务系统与ESB平台交易数据准实时查询",
                                "code":"00.0001.testQuery_sync",
                                "children":[

                                ]
                            },
                            {
                                "id":"11285",
                                "type":"",
                                "name":"testNoCon",
                                "code":"00.0001.ttt",
                                "children":[

                                ]
                            },
                            {
                                "id":"11286",
                                "type":"",
                                "name":"testWithCon",
                                "code":"00.0001.tttt",
                                "children":[

                                ]
                            },
                            {
                                "id":"11321",
                                "type":"",
                                "name":"测试模拟器标准服务_001",
                                "code":"00.0001.proxy_simulator_001",
                                "children":[

                                ]
                            },
                            {
                                "id":"12105",
                                "type":"",
                                "name":"测试",
                                "code":"00.0001.test111",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2503",
                        "type":"",
                        "name":"ESB平台",
                        "code":"00.1111",
                        "children":[
                            {
                                "id":"10190",
                                "type":"",
                                "name":"服务重投",
                                "code":"00.1111.esb_resend",
                                "children":[

                                ]
                            },
                            {
                                "id":"10196",
                                "type":"",
                                "name":"ESB_主数据组织信息同步",
                                "code":"00.1111.organization",
                                "children":[

                                ]
                            },
                            {
                                "id":"10235",
                                "type":"",
                                "name":"ESB_付款后的状态反馈WH",
                                "code":"00.1111.WHPaymentStatusService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10366",
                                "type":"",
                                "name":"ESB_PH付款后状态反馈",
                                "code":"00.1111.PHPayment",
                                "children":[

                                ]
                            },
                            {
                                "id":"10236",
                                "type":"",
                                "name":"ESB_付款后的状态反馈接口PH",
                                "code":"00.1111.PHPaymentStatusService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10269",
                                "type":"",
                                "name":"ESB_组织部门合并",
                                "code":"00.1111.org",
                                "children":[

                                ]
                            },
                            {
                                "id":"10491",
                                "type":"",
                                "name":"ESB_项目状态信息",
                                "code":"00.1111.projectsStates",
                                "children":[

                                ]
                            },
                            {
                                "id":"10490",
                                "type":"",
                                "name":"ESB_项目信息",
                                "code":"00.1111.projects",
                                "children":[

                                ]
                            },
                            {
                                "id":"10570",
                                "type":"",
                                "name":"test",
                                "code":"00.1111.test_xxx",
                                "children":[

                                ]
                            },
                            {
                                "id":"10233",
                                "type":"",
                                "name":"异步_统一分发测试",
                                "code":"00.1111.organitest",
                                "children":[

                                ]
                            },
                            {
                                "id":"10242",
                                "type":"",
                                "name":"ESB_客商信息",
                                "code":"00.1111.business",
                                "children":[

                                ]
                            },
                            {
                                "id":"10507",
                                "type":"",
                                "name":"ESB_合同_合同发布接口",
                                "code":"00.1111.UpdateContractService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10573",
                                "type":"",
                                "name":"test_by_lbp",
                                "code":"00.1111.test_lbp_query",
                                "children":[

                                ]
                            },
                            {
                                "id":"10889",
                                "type":"",
                                "name":"CRM_PMS/RMS交付验收结果",
                                "code":"00.1111.deliveryAcceptance",
                                "children":[

                                ]
                            },
                            {
                                "id":"10193",
                                "type":"",
                                "name":"ESB_订单收获信息返回标准符",
                                "code":"00.1111.receiveOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10200",
                                "type":"",
                                "name":"ESB_付款后的状态反馈接口",
                                "code":"00.1111.paymentStatusService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10237",
                                "type":"",
                                "name":"ESB_站点信息",
                                "code":"00.1111.site",
                                "children":[

                                ]
                            },
                            {
                                "id":"10727",
                                "type":"",
                                "name":"ESB_站点信息合并下发",
                                "code":"00.1111.receiveMergeSiteInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11916",
                                "type":"",
                                "name":"ESB_供应商推送",
                                "code":"00.1111.pushSupplierDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11490",
                                "type":"",
                                "name":"查询我的可用服务列表_平台内部标准服务",
                                "code":"00.1111.myServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11333",
                                "type":"",
                                "name":"ESB_接收审计相关状态接口",
                                "code":"00.1111.auditProjectsStates",
                                "children":[

                                ]
                            },
                            {
                                "id":"11368",
                                "type":"",
                                "name":"ESB_项目基础信息",
                                "code":"00.1111.PDSSProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11489",
                                "type":"",
                                "name":"查询所有可用服务列表_平台内部标准服务",
                                "code":"00.1111.listServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11246",
                                "type":"",
                                "name":"GIS",
                                "code":"00.1111.batchStationToMapCT",
                                "children":[

                                ]
                            },
                            {
                                "id":"11491",
                                "type":"",
                                "name":"申请服务使用_平台内部标准服务",
                                "code":"00.1111.applyServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"12130",
                                "type":"",
                                "name":"查询服目录数据_平台内部标准服务",
                                "code":"00.1111.getServiceCatalog",
                                "children":[

                                ]
                            },
                            {
                                "id":"12131",
                                "type":"",
                                "name":"查询服务详细配置数据_平台内部标准服务",
                                "code":"00.1111.getServiceConfig",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2885",
                        "type":"",
                        "name":"综合服务开通系统",
                        "code":"00.1101",
                        "children":[
                            {
                                "id":"11274",
                                "type":"",
                                "name":"同步服务-01",
                                "code":"00.1101.SYNC_SERV01_queryResult",
                                "children":[

                                ]
                            },
                            {
                                "id":"11275",
                                "type":"",
                                "name":"同步服务-01",
                                "code":"00.1101.SYNC_SERV01",
                                "children":[

                                ]
                            },
                            {
                                "id":"11279",
                                "type":"",
                                "name":"异步服务-02",
                                "code":"00.1101.ASYNC_SERV02",
                                "children":[

                                ]
                            },
                            {
                                "id":"11299",
                                "type":"",
                                "name":"异步服务-012",
                                "code":"00.1101.SYNC_SERV01_queryResult_02",
                                "children":[

                                ]
                            },
                            {
                                "id":"11276",
                                "type":"",
                                "name":"异步服务-01",
                                "code":"00.1101.ASYNC_SERV01",
                                "children":[

                                ]
                            },
                            {
                                "id":"11278",
                                "type":"",
                                "name":"同步服务-02",
                                "code":"00.1101.SYNC_SERV02",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2888",
                        "type":"",
                        "name":"综合服务保障系统",
                        "code":"00.1102",
                        "children":[
                            {
                                "id":"11277",
                                "type":"",
                                "name":"同步服务-03",
                                "code":"00.1102.SYNC_SERV03",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2905",
                        "type":"",
                        "name":"Eureka平台",
                        "code":"00.9999",
                        "children":[
                            {
                                "id":"11568",
                                "type":"",
                                "name":"demo服务",
                                "code":"00.9999.homeUsingPOST",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2886",
                        "type":"",
                        "name":"企业数据应用门户",
                        "code":"00.1301",
                        "children":[
                            {
                                "id":"11418",
                                "type":"",
                                "name":"test",
                                "code":"00.1301.sss",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"2525",
                "type":"",
                "name":"中国铁塔BSS域",
                "code":"10",
                "children":[
                    {
                        "id":"2546",
                        "type":"",
                        "name":"物业管理系统",
                        "code":"10.1002",
                        "children":[
                            {
                                "id":"10191",
                                "type":"",
                                "name":"BSS域_物业_付款装状态信息接口",
                                "code":"10.1002.paymentStatusService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10493",
                                "type":"",
                                "name":"合同_物业_合同变更接口",
                                "code":"10.1002.UpdateContractStateService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10626",
                                "type":"",
                                "name":"CRM_物业_站点电费结算模式",
                                "code":"10.1002.StationCustomerSettpatService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10686",
                                "type":"",
                                "name":"财务_物业_付款",
                                "code":"10.1002.payment",
                                "children":[

                                ]
                            },
                            {
                                "id":"10966",
                                "type":"",
                                "name":"MDM_物业_站点信息合并",
                                "code":"10.1002.MDMZDXXHB",
                                "children":[

                                ]
                            },
                            {
                                "id":"10177",
                                "type":"",
                                "name":"BSS域_物业_账号变更服务",
                                "code":"10.1002.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10185",
                                "type":"",
                                "name":"BSS域_物业场地租金查询",
                                "code":"10.1002.ContractPrice",
                                "children":[

                                ]
                            },
                            {
                                "id":"10494",
                                "type":"",
                                "name":"合同_物业_合同发布接口",
                                "code":"10.1002.UpdateContractService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10495",
                                "type":"",
                                "name":"合同_物业_合同删除接口",
                                "code":"10.1002.DeleteContractService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10226",
                                "type":"",
                                "name":"BSS域_物业_站点信息",
                                "code":"10.1002.MDMSITE",
                                "children":[

                                ]
                            },
                            {
                                "id":"10227",
                                "type":"",
                                "name":"BSS域_物业_组织部门合并",
                                "code":"10.1002.MDMBZDWBMDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10228",
                                "type":"",
                                "name":"BSS域_物业_客商地区",
                                "code":"10.1002.MDMDQZD",
                                "children":[

                                ]
                            },
                            {
                                "id":"10229",
                                "type":"",
                                "name":"BSS域_物业_人员",
                                "code":"10.1002.MDMZGZD",
                                "children":[

                                ]
                            },
                            {
                                "id":"10391",
                                "type":"",
                                "name":"CRM_物业_站址租赁合同工单",
                                "code":"10.1002.ReleaseContractRentOrder",
                                "children":[

                                ]
                            },
                            {
                                "id":"10427",
                                "type":"",
                                "name":"BSS域_物业_提供给CRM费用查询",
                                "code":"10.1002.Cost_query",
                                "children":[

                                ]
                            },
                            {
                                "id":"10176",
                                "type":"",
                                "name":"BSS域_物业场地租金查询",
                                "code":"10.1002.rentContactPrice",
                                "children":[

                                ]
                            },
                            {
                                "id":"10178",
                                "type":"",
                                "name":"BSS域_物业_账号角色授权服务",
                                "code":"10.1002.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11167",
                                "type":"",
                                "name":"公共库_物业_接收站址同步",
                                "code":"10.1002.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11427",
                                "type":"",
                                "name":"BSS域_物业_接收财务退款处理结果信息接口",
                                "code":"10.1002.rentRefundStatus",
                                "children":[

                                ]
                            },
                            {
                                "id":"11708",
                                "type":"",
                                "name":"合同_物业_合同系统推送合同不需要续签接口",
                                "code":"10.1002.contractNoNeed",
                                "children":[

                                ]
                            },
                            {
                                "id":"11948",
                                "type":"",
                                "name":"合同系统查询物业系统合同在途单信息接口",
                                "code":"10.1002.isHavingPayOrder",
                                "children":[

                                ]
                            },
                            {
                                "id":"11296",
                                "type":"",
                                "name":"财务_物业_同步接收支付单处理结果信息",
                                "code":"10.1002.receiveAccountState",
                                "children":[

                                ]
                            },
                            {
                                "id":"11336",
                                "type":"",
                                "name":"RMS_物业_站址业务问询接口",
                                "code":"10.1002.siteBusinessInquiries",
                                "children":[

                                ]
                            },
                            {
                                "id":"11606",
                                "type":"",
                                "name":"合同_物业_合同系统推送合同续签补录接口",
                                "code":"10.1002.renewContractPublish",
                                "children":[

                                ]
                            },
                            {
                                "id":"11806",
                                "type":"",
                                "name":"财务_物业_财务系统推送查询物业资产前台化接口",
                                "code":"10.1002.qryContractRentInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11337",
                                "type":"",
                                "name":"公共库_物业_组织区域接口",
                                "code":"10.1002.GG_INTERFACE_ORG_REG_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11389",
                                "type":"",
                                "name":"选址_物业_选址系统存量业主查询接口",
                                "code":"10.1002.qryPropOwnerInfoService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11986",
                                "type":"",
                                "name":"财务_物业_电费退款接口",
                                "code":"10.1002.EleRefundService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11608",
                                "type":"",
                                "name":"统一_CRM_新业务详单查询",
                                "code":"10.1002.newBusinessForDetails",
                                "children":[

                                ]
                            },
                            {
                                "id":"11247",
                                "type":"",
                                "name":"合同_物业_合同发布接口（新）",
                                "code":"10.1002.ContractPublish",
                                "children":[

                                ]
                            },
                            {
                                "id":"11250",
                                "type":"",
                                "name":"合同_物业_合同站点更换接口",
                                "code":"10.1002.contractStationChange",
                                "children":[

                                ]
                            },
                            {
                                "id":"11381",
                                "type":"",
                                "name":"公共库_物业_资产卡片接口",
                                "code":"10.1002.GG_INTERFACE_FIXED_Syn",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2526",
                        "type":"",
                        "name":"CRM系统",
                        "code":"10.1001",
                        "children":[
                            {
                                "id":"11006",
                                "type":"",
                                "name":"MDM_CRM_站点信息",
                                "code":"10.1001.MDMSITE",
                                "children":[

                                ]
                            },
                            {
                                "id":"10108",
                                "type":"",
                                "name":"服开_转开通单竣工",
                                "code":"10.1001.tradeFinish",
                                "children":[

                                ]
                            },
                            {
                                "id":"10174",
                                "type":"",
                                "name":"BSS域_CRM_账号变更服务",
                                "code":"10.1001.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10175",
                                "type":"",
                                "name":"BSS域_CRM_账号角色授权服务",
                                "code":"10.1001.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10406",
                                "type":"",
                                "name":"BSS域_CRM_站址租赁合同签订",
                                "code":"10.1001.ContractSigningResults",
                                "children":[

                                ]
                            },
                            {
                                "id":"10511",
                                "type":"",
                                "name":"运维_CRM_故障公告发布",
                                "code":"10.1001.taskAnnouncementSevice",
                                "children":[

                                ]
                            },
                            {
                                "id":"10396",
                                "type":"",
                                "name":"RMS_CRM_塔类需求整合结果",
                                "code":"10.1001.BackIntegrationResults",
                                "children":[

                                ]
                            },
                            {
                                "id":"10512",
                                "type":"",
                                "name":"运维_CRM_故障回单接口",
                                "code":"10.1001.taskFaultReplyService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10931",
                                "type":"",
                                "name":"运营商门户_CRM_需求详情接口(铁塔类)",
                                "code":"10.1001.towerDemandForDetails",
                                "children":[

                                ]
                            },
                            {
                                "id":"10932",
                                "type":"",
                                "name":"运营商门户_CRM_需求详情接口(楼宇室分类)",
                                "code":"10.1001.buildDemandForDetails",
                                "children":[

                                ]
                            },
                            {
                                "id":"10116",
                                "type":"",
                                "name":"PMS_项目交付",
                                "code":"10.1001.proFinishData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10247",
                                "type":"",
                                "name":"BSS域_CRM_订单取消",
                                "code":"10.1001.cancelDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10929",
                                "type":"",
                                "name":"运营商门户_CRM_交付验收单信息查询",
                                "code":"10.1001.checkDeliveryInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10930",
                                "type":"",
                                "name":"运营商门户_CRM_批次同步接口",
                                "code":"10.1001.SyncBatchService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10085",
                                "type":"",
                                "name":"PMS_项目交付",
                                "code":"10.1001.ProjectFinishService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10246",
                                "type":"",
                                "name":"BSS域_CRM_订单取消",
                                "code":"10.1001.ancelDemandData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10726",
                                "type":"",
                                "name":"主数据_CRM_站点合并信息",
                                "code":"10.1001.receiveMergeSiteInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"10928",
                                "type":"",
                                "name":"运营商门户_CRM_业务确认接口",
                                "code":"10.1001.confirmationForService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10933",
                                "type":"",
                                "name":"运营商门户_CRM_需求详情接口(隧道室分类)",
                                "code":"10.1001.DemandForDetails",
                                "children":[

                                ]
                            },
                            {
                                "id":"10939",
                                "type":"",
                                "name":"运营商门户_CRM_通过合并订单号查询对应的需求单号",
                                "code":"10.1001.checkRequestionByMerge",
                                "children":[

                                ]
                            },
                            {
                                "id":"11113",
                                "type":"",
                                "name":"PMS_CRM_获取站址是否存在有效需求单接口",
                                "code":"10.1001.BackRequireCodeInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11258",
                                "type":"",
                                "name":"公共库_CRM_接收固定资产卡片原值",
                                "code":"10.1001.GG_INTERFACE_FIXED_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11334",
                                "type":"",
                                "name":"RMS_CRM_站址删除询问接口",
                                "code":"10.1001.siteBusinessInquiries",
                                "children":[

                                ]
                            },
                            {
                                "id":"11335",
                                "type":"",
                                "name":"RMS_CRM_同步服务商信息",
                                "code":"10.1001.siteService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11565",
                                "type":"",
                                "name":"财务_CRM_财务缴费接口",
                                "code":"10.1001.paymentSingle",
                                "children":[

                                ]
                            },
                            {
                                "id":"11992",
                                "type":"",
                                "name":"门户_crm_运营商终止确认接口",
                                "code":"10.1001.serviceTerminationConfirmation",
                                "children":[

                                ]
                            },
                            {
                                "id":"11993",
                                "type":"",
                                "name":"门户_crm_运营商终止申请导入接口",
                                "code":"10.1001.customerTerminationImport",
                                "children":[

                                ]
                            },
                            {
                                "id":"12005",
                                "type":"",
                                "name":"财务_crm_回款未确认推送接口",
                                "code":"10.1001.paymentUnconfirmed",
                                "children":[

                                ]
                            },
                            {
                                "id":"11365",
                                "type":"",
                                "name":"运营商门户_CRM_需求修改",
                                "code":"10.1001.demandUpdateTY",
                                "children":[

                                ]
                            },
                            {
                                "id":"11396",
                                "type":"",
                                "name":"RMS_CRM_资源预占同步返回接口",
                                "code":"10.1001.resPreBackService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11409",
                                "type":"",
                                "name":"统一业务平台_CRM_需求详情接口(非标类)",
                                "code":"10.1001.towerSpecialForDetails",
                                "children":[

                                ]
                            },
                            {
                                "id":"11870",
                                "type":"",
                                "name":"PMS_CRM_所属高铁或地铁线路名称查询",
                                "code":"10.1001.QueryLineNameInterface",
                                "children":[

                                ]
                            },
                            {
                                "id":"11171",
                                "type":"",
                                "name":"选址_CRM_选址结果信息同步接口",
                                "code":"10.1001.siteSelectResultCommit",
                                "children":[

                                ]
                            },
                            {
                                "id":"11585",
                                "type":"",
                                "name":"统一_CRM_移动塔类订单需求取消接口",
                                "code":"10.1001.DemandStateCancelService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11609",
                                "type":"",
                                "name":"统一_CRM_新业务详单查询",
                                "code":"10.1001.newBusinessForDetails",
                                "children":[

                                ]
                            },
                            {
                                "id":"11170",
                                "type":"",
                                "name":"选址_CRM_站址进展信息同步接口",
                                "code":"10.1001.siteSelectProgressInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11300",
                                "type":"",
                                "name":"主数据_CRM_客商信息",
                                "code":"10.1001.MDMWLDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"11302",
                                "type":"",
                                "name":"合同_CRM_合同变更接口",
                                "code":"10.1001.UpdateContractStateService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11498",
                                "type":"",
                                "name":"公共库_CRM_公共库枚举值推送",
                                "code":"10.1001.ggkenumPush",
                                "children":[

                                ]
                            },
                            {
                                "id":"11605",
                                "type":"",
                                "name":"PMS_CRM_费用计算查询接口",
                                "code":"10.1001.QueryCostInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11284",
                                "type":"",
                                "name":"合同_CRM_合同信息分发",
                                "code":"10.1001.UpdateContractService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11289",
                                "type":"",
                                "name":"BSS域_CRM_疑似重单检查接口",
                                "code":"10.1001.suspectedDuplicateOrderService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11290",
                                "type":"",
                                "name":"BSS域_CRM_运营商客户提交需求接口",
                                "code":"10.1001.submissionRequirementsService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11384",
                                "type":"",
                                "name":"运营商门户_CRM_订单取消与变更结果回调接口",
                                "code":"10.1001.requestCancelAndAlterReturn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11444",
                                "type":"",
                                "name":"规划_crm_微站需求整合反馈接口",
                                "code":"10.1001.SmallCallBackIntegrationResults",
                                "children":[

                                ]
                            },
                            {
                                "id":"11830",
                                "type":"",
                                "name":"规划_CRM_微站点位信息修改",
                                "code":"10.1001.ChangePointInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11260",
                                "type":"",
                                "name":"RMS_CRM_查询机房/铁塔信息",
                                "code":"10.1001.SiteGainRoomInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11317",
                                "type":"",
                                "name":"运营商门户_CRM_结算信息推送接口",
                                "code":"10.1001.billingInformationPushService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11322",
                                "type":"",
                                "name":"公共库_CRM_组织区域",
                                "code":"10.1001.GG_INTERFACE_ORG_REG_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11325",
                                "type":"",
                                "name":"运营商门户_CRM_需求单信息接口",
                                "code":"10.1001.requestIdInfoService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11174",
                                "type":"",
                                "name":"PMS/门户_CRM_传输详情查询",
                                "code":"10.1001.transferForDetails",
                                "children":[

                                ]
                            },
                            {
                                "id":"11175",
                                "type":"",
                                "name":"公共库_CRM_接收公共数据",
                                "code":"10.1001.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"12168",
                                "type":"",
                                "name":"test6666",
                                "code":"test6677",
                                "children":[

                                ]
                            },
                            {
                                "id":"12169",
                                "type":"",
                                "name":"test6666",
                                "code":"test2233",
                                "children":[

                                ]
                            },
                            {
                                "id":"12170",
                                "type":"",
                                "name":"test6666",
                                "code":"test5553",
                                "children":[

                                ]
                            },
                            {
                                "id":"12171",
                                "type":"",
                                "name":"test6666",
                                "code":"test8885",
                                "children":[

                                ]
                            },
                            {
                                "id":"12172",
                                "type":"",
                                "name":"test6666",
                                "code":"test676",
                                "children":[

                                ]
                            },
                            {
                                "id":"12175",
                                "type":"",
                                "name":"testeee",
                                "code":"test5451",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2988",
                        "type":"",
                        "name":"微服务",
                        "code":"10.1004",
                        "children":[
                            {
                                "id":"11919",
                                "type":"",
                                "name":"微服务适配webservice接口",
                                "code":"10.1004.MicroService",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"3005",
                        "type":"",
                        "name":"新OA",
                        "code":"10.1005",
                        "children":[
                            {
                                "id":"11927",
                                "type":"",
                                "name":"新4A_新OA_角色授权接口",
                                "code":"10.1005.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11925",
                                "type":"",
                                "name":"新4A_新OA_人员组织架构同步",
                                "code":"10.1005.syncHrm",
                                "children":[

                                ]
                            },
                            {
                                "id":"11926",
                                "type":"",
                                "name":"新4A_新OA_人员组织架构同步",
                                "code":"10.1005.syncOrg",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"2523",
                "type":"",
                "name":"test333",
                "code":"test222",
                "children":[
                    {
                        "id":"2527",
                        "type":"",
                        "name":"运维监控系统",
                        "code":"20.2002",
                        "children":[
                            {
                                "id":"10195",
                                "type":"",
                                "name":"OSS域_运维_账号角色授权服务",
                                "code":"20.2002.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10746",
                                "type":"",
                                "name":"合同_运维_合同信息分发",
                                "code":"20.2002.UpdateContractService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10747",
                                "type":"",
                                "name":"合同_运维_合同状态变更",
                                "code":"20.2002.UpdateContractStateService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10095",
                                "type":"",
                                "name":"CRM_故障申告工单处理情况查询服务",
                                "code":"20.2002.getTaskData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10194",
                                "type":"",
                                "name":"OSS域_运维_账号变更服务",
                                "code":"20.2002.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10094",
                                "type":"",
                                "name":"CRM_开通单的环节查询",
                                "code":"20.2002.tradeLinkQuery",
                                "children":[

                                ]
                            },
                            {
                                "id":"10096",
                                "type":"",
                                "name":"CRM_运维告警信息查询服务",
                                "code":"20.2002.getAlarmData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10097",
                                "type":"",
                                "name":"CRM_群障信息通知服务",
                                "code":"20.2002.putGroupFaultData",
                                "children":[

                                ]
                            },
                            {
                                "id":"10508",
                                "type":"",
                                "name":"CRM_运维_障单申告派发服务",
                                "code":"20.2002.sendTaskServer",
                                "children":[

                                ]
                            },
                            {
                                "id":"10509",
                                "type":"",
                                "name":"CRM_运维_故障申告工单处理情况查询服务",
                                "code":"20.2002.CheckTaskDataServer",
                                "children":[

                                ]
                            },
                            {
                                "id":"10510",
                                "type":"",
                                "name":"CRM_运维_告警信息查询",
                                "code":"20.2002.alarmQueryData",
                                "children":[

                                ]
                            },
                            {
                                "id":"11991",
                                "type":"",
                                "name":"公共库_运维_同步机房",
                                "code":"20.2002.GGResRoomSyn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11186",
                                "type":"",
                                "name":"公共库_运维_接收站址同步",
                                "code":"20.2002.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"12065",
                                "type":"",
                                "name":"资源_运维监控_接收同步的蓄电池信息",
                                "code":"20.2002.resAccumulatorCellSyn",
                                "children":[

                                ]
                            },
                            {
                                "id":"12066",
                                "type":"",
                                "name":"资源_运维监控_接收同步的开关电源",
                                "code":"20.2002.resSwitchPowerSyn",
                                "children":[

                                ]
                            },
                            {
                                "id":"12067",
                                "type":"",
                                "name":"资源_运维监控_接收同步的空调信息",
                                "code":"20.2002.resAirSyn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11990",
                                "type":"",
                                "name":"公共库_运维_同步铁塔",
                                "code":"20.2002.GGResTowerSyn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11342",
                                "type":"",
                                "name":"资源_运维_站址业务判断",
                                "code":"20.2002.siteBusinessInquiries",
                                "children":[

                                ]
                            },
                            {
                                "id":"11499",
                                "type":"",
                                "name":"响应_运维_客服系统查询运维监控系统站址",
                                "code":"20.2002.queryStationId",
                                "children":[

                                ]
                            },
                            {
                                "id":"11500",
                                "type":"",
                                "name":"响应_运维_客服系统发送开门指令给运维监控系统",
                                "code":"20.2002.openDoor",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2524",
                        "type":"",
                        "name":"资源管理系统",
                        "code":"20.2001",
                        "children":[
                            {
                                "id":"10241",
                                "type":"",
                                "name":"OSS域_RMS_客商接口",
                                "code":"20.2001.MDMWLDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10326",
                                "type":"",
                                "name":"CRM_站址状态变更接口",
                                "code":"20.2001.updateStationsSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10389",
                                "type":"",
                                "name":"CRM_RMS_修改站址经纬度",
                                "code":"20.2001.updateSiteLongitudeLatitudeSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10666",
                                "type":"",
                                "name":"PMS/CRM_RMS_站址资源信息查询",
                                "code":"20.2001.querySiteResourceInfoSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10786",
                                "type":"",
                                "name":"MDM_RMS_项目信息",
                                "code":"20.2001.MDMPROJECTS",
                                "children":[

                                ]
                            },
                            {
                                "id":"10787",
                                "type":"",
                                "name":"MDM_RMS_项目状态信息",
                                "code":"20.2001.MDMPROJECTSSTATES",
                                "children":[

                                ]
                            },
                            {
                                "id":"10065",
                                "type":"",
                                "name":"服务开通_告警故障资源置障",
                                "code":"20.2001.alarmResClearSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10118",
                                "type":"",
                                "name":"4A_从账号变更",
                                "code":"20.2001.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10192",
                                "type":"",
                                "name":"OSS域_RMS_组织部门合并",
                                "code":"20.2001.MDMBZDWBMDW",
                                "children":[

                                ]
                            },
                            {
                                "id":"10567",
                                "type":"",
                                "name":"PMS_RMS_项目管理审核",
                                "code":"20.2001.updateMntStateForPms",
                                "children":[

                                ]
                            },
                            {
                                "id":"10646",
                                "type":"",
                                "name":"财务_RMS_资产转固接口",
                                "code":"20.2001.assetTransferSolid",
                                "children":[

                                ]
                            },
                            {
                                "id":"10386",
                                "type":"",
                                "name":"CRM_RMS_修改站址和需求关系",
                                "code":"20.2001.updateSiteRequestSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10388",
                                "type":"",
                                "name":"CRM_RMS_塔类需求提交整合",
                                "code":"20.2001.towerSubmitIntegrateSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10390",
                                "type":"",
                                "name":"CRM_RMS_创建站址",
                                "code":"20.2001.createStationsBySiteSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10826",
                                "type":"",
                                "name":"资源APP_RMS_APP专业接口",
                                "code":"20.2001.queryResNoByAppSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10066",
                                "type":"",
                                "name":"服开——告警故障资源置障",
                                "code":"20.2001.alarmResDealSr",
                                "children":[

                                ]
                            },
                            {
                                "id":"10067",
                                "type":"",
                                "name":"服开_资源配置",
                                "code":"20.2001.resConfigSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10068",
                                "type":"",
                                "name":"服开_归档通知/归档接口",
                                "code":"20.2001.resArchiveSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10071",
                                "type":"",
                                "name":"服开_告警故障资源归档",
                                "code":"20.2001.alarmResClearSrv2",
                                "children":[

                                ]
                            },
                            {
                                "id":"10072",
                                "type":"",
                                "name":"运维_巡检资源查询",
                                "code":"20.2001.resQcQuerySrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10119",
                                "type":"",
                                "name":"4A_从帐号角色授权变更接口",
                                "code":"20.2001.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10062",
                                "type":"",
                                "name":"站址信息查询",
                                "code":"20.2001.SiteInfoQrySrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10063",
                                "type":"",
                                "name":"运维_资源核查",
                                "code":"20.2001.resCheckWS",
                                "children":[

                                ]
                            },
                            {
                                "id":"10064",
                                "type":"",
                                "name":"告警故障资源查询",
                                "code":"20.2001.alarmResQuerySrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10204",
                                "type":"",
                                "name":"OSS域_RMS_站点新增",
                                "code":"20.2001.CreateStationsSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10387",
                                "type":"",
                                "name":"CRM_RMS_删除站址和需求关系",
                                "code":"20.2001.delSiteRequestSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10407",
                                "type":"",
                                "name":"CRM_RMS_预选址站址信息查询",
                                "code":"20.2001.querySiteInfoSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10466",
                                "type":"",
                                "name":"资产清查_资产状态变更接口",
                                "code":"20.2001.updateISStations",
                                "children":[

                                ]
                            },
                            {
                                "id":"10807",
                                "type":"",
                                "name":"CRM_RMS_RMS站址信息查询",
                                "code":"20.2001.RMSQuerySiteInfoSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11177",
                                "type":"",
                                "name":"ESB_RMS_二次握手告警通知",
                                "code":"20.2001.rollBackNoticeService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11424",
                                "type":"",
                                "name":"财务_资源_接收财务推送报废额度接口",
                                "code":"20.2001.assetScrapQuota",
                                "children":[

                                ]
                            },
                            {
                                "id":"11626",
                                "type":"",
                                "name":"PMS_资源_站址资源信息查询（批量）",
                                "code":"20.2001.querySiteResourceForPMS",
                                "children":[

                                ]
                            },
                            {
                                "id":"11305",
                                "type":"",
                                "name":"PDSS_RMS_推送场租与共享单位",
                                "code":"20.2001.GG_INTERFACE_ORG_REG_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11364",
                                "type":"",
                                "name":"PDSS_RMS_订单信息",
                                "code":"20.2001.PDSSOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11545",
                                "type":"",
                                "name":"公共库_资源_接收枚举值信息",
                                "code":"20.2001.ggkenumPush",
                                "children":[

                                ]
                            },
                            {
                                "id":"11805",
                                "type":"",
                                "name":"需求整合_资源_资源接收点位变更信息接口",
                                "code":"20.2001.receivePointInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12025",
                                "type":"",
                                "name":"主数据-资源管理接收物料编码",
                                "code":"20.2001.productCodeDataInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11172",
                                "type":"",
                                "name":"公共库_RMS_接收同步数据",
                                "code":"20.2001.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11261",
                                "type":"",
                                "name":"选址_RMS_站址信息查询接口",
                                "code":"20.2001.querySiteInfoXZ",
                                "children":[

                                ]
                            },
                            {
                                "id":"11282",
                                "type":"",
                                "name":"财务_RMS_资产转固补全接口",
                                "code":"20.2001.completionAsset",
                                "children":[

                                ]
                            },
                            {
                                "id":"11391",
                                "type":"",
                                "name":"CRM_RMS_资源实占接口",
                                "code":"20.2001.getResPreOccupForCRMService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11362",
                                "type":"",
                                "name":"PDSS_RMS_项目信息",
                                "code":"20.2001.PDSSProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11363",
                                "type":"",
                                "name":"PDSS_RMS_项目状态信息",
                                "code":"20.2001.PDSSProjectStatus",
                                "children":[

                                ]
                            },
                            {
                                "id":"11398",
                                "type":"",
                                "name":"统一业务平台_资源系统_站址查询",
                                "code":"20.2001.SiteResourceService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11399",
                                "type":"",
                                "name":"统一业务平台_资源系统_铁塔查询",
                                "code":"20.2001.TowerResourceService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11400",
                                "type":"",
                                "name":"统一业务平台_资源系统_机房查询",
                                "code":"20.2001.RoomResourceService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11256",
                                "type":"",
                                "name":"资产_RMS_接收站址巡查信息",
                                "code":"20.2001.receiveInspectionInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11268",
                                "type":"",
                                "name":"选址_RMS_查询站址信息",
                                "code":"20.2001.querySiteInfoXZRES",
                                "children":[

                                ]
                            },
                            {
                                "id":"11280",
                                "type":"",
                                "name":"财务_RMS_主设备及实物信息推送资源系统",
                                "code":"20.2001.assetsAssembling",
                                "children":[

                                ]
                            },
                            {
                                "id":"11304",
                                "type":"",
                                "name":"PDSS_RMS_推送场租与共享单位",
                                "code":"20.2001.GG_INTERFACE_Syn2",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2783",
                        "type":"",
                        "name":"规划支撑系统",
                        "code":"20.2006",
                        "children":[
                            {
                                "id":"11067",
                                "type":"",
                                "name":"4A_规划支撑系统_账号角色授权服务",
                                "code":"20.2006.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11068",
                                "type":"",
                                "name":"4A_规划支撑系统_账号变更服务",
                                "code":"20.2006.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11107",
                                "type":"",
                                "name":"选址系统_规划支撑系统_储备站址信息同步接口",
                                "code":"20.2006.reserveSiteToTapWeb",
                                "children":[

                                ]
                            },
                            {
                                "id":"11146",
                                "type":"",
                                "name":"选址系统_规划支撑系统_选址失败站址信息同步规划支撑",
                                "code":"20.2006.failSiteToTapWeb",
                                "children":[

                                ]
                            },
                            {
                                "id":"11397",
                                "type":"",
                                "name":"选址_规划支撑系统_选址结果同步接口",
                                "code":"20.2006.syncSiteResult",
                                "children":[

                                ]
                            },
                            {
                                "id":"11207",
                                "type":"",
                                "name":"PMS_规划支撑系统_PMS主动规划检索信息接口",
                                "code":"20.2006.queryTapSiteInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11420",
                                "type":"",
                                "name":"公共库_选址_公共库下发站址信息接口",
                                "code":"20.2006.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2803",
                        "type":"",
                        "name":"Solr",
                        "code":"20.2007",
                        "children":[
                            {
                                "id":"11086",
                                "type":"",
                                "name":"RMS_SOLR_搜索引擎",
                                "code":"20.2007.query",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2824",
                        "type":"",
                        "name":"选址系统",
                        "code":"20.2008",
                        "children":[
                            {
                                "id":"11108",
                                "type":"",
                                "name":"CRM_选址系统_需求整合结果和原始需求导入接口",
                                "code":"20.2008.MergeAndOriginalReqService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11110",
                                "type":"",
                                "name":"CRM_选址系统_需求状态信息导入接口",
                                "code":"20.2008.DemandStateService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11114",
                                "type":"",
                                "name":"OSS域_选址系统_同步4A用户",
                                "code":"20.2008.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11126",
                                "type":"",
                                "name":"物业_选址系统_合同站点信息同步接口",
                                "code":"20.2008.PropContractSiteSyncService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11946",
                                "type":"",
                                "name":"需求整合_选址_微站类服务导入接口",
                                "code":"20.2008.ImportMsSiteService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11109",
                                "type":"",
                                "name":"CRM_选址系统_需求变更信息导入接口",
                                "code":"20.2008.DemandChangeService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11506",
                                "type":"",
                                "name":"公共库_选址_枚举值推送接口",
                                "code":"20.2008.ggkenumPush",
                                "children":[

                                ]
                            },
                            {
                                "id":"11945",
                                "type":"",
                                "name":"需求整合_选址_铁塔类服务导入",
                                "code":"20.2008.ImportTowerSiteService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11947",
                                "type":"",
                                "name":"需求整合_选址_塔类,微站类业务变更接口",
                                "code":"20.2008.ResourceSiteServiceChange",
                                "children":[

                                ]
                            },
                            {
                                "id":"11111",
                                "type":"",
                                "name":"规划管理_选址系统_站址规划信息同步接口",
                                "code":"20.2008.ImportPlanSiteService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11112",
                                "type":"",
                                "name":"4A_选址系统_内部帐号门户角色变更反向接口",
                                "code":"20.2008.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11383",
                                "type":"",
                                "name":"物业_选址_获取业主信息接口",
                                "code":"20.2008.propOwnerSiteSyncService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11392",
                                "type":"",
                                "name":"PMS_选址_站址谈判费用标准传入PMS系统信息接口",
                                "code":"20.2008.propPmsSiteSyncService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11411",
                                "type":"",
                                "name":"运营商门户_选址_筛查确认结果导入选址接口",
                                "code":"20.2008.ScreeningValidationResultsImportService",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2603",
                        "type":"",
                        "name":"预选址支撑系统",
                        "code":"20.2004",
                        "children":[
                            {
                                "id":"10394",
                                "type":"",
                                "name":"4A_LMS_账号变更服务",
                                "code":"20.2004.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10395",
                                "type":"",
                                "name":"4A_LMS_账号角色授权服务",
                                "code":"20.2004.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11115",
                                "type":"",
                                "name":"选址系统_预选址_储备站址状态更新接口",
                                "code":"20.2004.reserveSiteToPreWeb",
                                "children":[

                                ]
                            },
                            {
                                "id":"11116",
                                "type":"",
                                "name":"选址系统_预选址_疑难站址状态更新接口",
                                "code":"20.2004.difficultSiteToPreWeb",
                                "children":[

                                ]
                            },
                            {
                                "id":"11745",
                                "type":"",
                                "name":"PMS_需求整合_PMS微站类需求销项反馈接口",
                                "code":"20.2004.resMicroProgramDelSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11746",
                                "type":"",
                                "name":"CRM_需求整合_CRM微站类需求取消反馈接口",
                                "code":"20.2004.respondMicroDemandSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11432",
                                "type":"",
                                "name":"oss_选址系统_微站点位信息公共查询接口",
                                "code":"20.2004.backPointInfoForAllSys",
                                "children":[

                                ]
                            },
                            {
                                "id":"11394",
                                "type":"",
                                "name":"选址_预选址_选址结果同步接口",
                                "code":"20.2004.siteSelectionResultSync",
                                "children":[

                                ]
                            },
                            {
                                "id":"11407",
                                "type":"",
                                "name":"PDSS_预选址_CRM订单信息下发接口",
                                "code":"20.2004.PDSSOrderInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11419",
                                "type":"",
                                "name":"PDSS_预选址_公共库下发站址信息接口",
                                "code":"20.2004.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            },
                            {
                                "id":"11965",
                                "type":"",
                                "name":"门户_预选址系统_筛查确认结果导入预选址接口",
                                "code":"20.2004.ScreeningValidationResultsImportService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11414",
                                "type":"",
                                "name":"PDSS_预选址_公共库下发站址信息接口",
                                "code":"20.2004.GG_INTERFACE_Syn_1",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2528",
                        "type":"",
                        "name":"服务开通系统",
                        "code":"20.2003",
                        "children":[
                            {
                                "id":"10092",
                                "type":"",
                                "name":"CRM_筛查任务发送",
                                "code":"20.2003.screenTask",
                                "children":[

                                ]
                            },
                            {
                                "id":"10093",
                                "type":"",
                                "name":"CRM_需求转开通单",
                                "code":"20.2003.openTradeSend",
                                "children":[

                                ]
                            },
                            {
                                "id":"10105",
                                "type":"",
                                "name":"资源_资源配置反馈服务",
                                "code":"20.2003.resConfigBackSrv",
                                "children":[

                                ]
                            },
                            {
                                "id":"10091",
                                "type":"",
                                "name":"CRM_故障单申告派发服务",
                                "code":"20.2003.sendTaskDat",
                                "children":[

                                ]
                            },
                            {
                                "id":"10098",
                                "type":"",
                                "name":"CRM_开通单的环节查询",
                                "code":"20.2003.tradeLinkQuery",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"2583",
                "type":"",
                "name":"中国铁塔D域",
                "code":"50",
                "children":[
                    {
                        "id":"2584",
                        "type":"",
                        "name":"经营分析系统",
                        "code":"50.5001",
                        "children":[
                            {
                                "id":"10392",
                                "type":"",
                                "name":"4A_经分_账号变更服务",
                                "code":"50.5001.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"10393",
                                "type":"",
                                "name":"4A_经分_账号角色授权服务",
                                "code":"50.5001.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11497",
                                "type":"",
                                "name":"公共数据库_经分_枚举值推送接口",
                                "code":"50.5001.enumPush",
                                "children":[

                                ]
                            },
                            {
                                "id":"11466",
                                "type":"",
                                "name":"pms_经分_项目信息接口",
                                "code":"50.5001.getProjectInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11504",
                                "type":"",
                                "name":"公共数据库_经分_枚举值推送接口",
                                "code":"50.5001.ggkenumPush",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"3034",
                        "type":"",
                        "name":"新经分系统",
                        "code":"50.5002",
                        "children":[
                            {
                                "id":"11998",
                                "type":"",
                                "name":"新4A_新经分_从账号变更接口",
                                "code":"50.5002.updateAppAcct",
                                "children":[

                                ]
                            },
                            {
                                "id":"11997",
                                "type":"",
                                "name":"新4A_新经分_组织机构变更接口",
                                "code":"50.5002.updateAppOrg",
                                "children":[

                                ]
                            },
                            {
                                "id":"11999",
                                "type":"",
                                "name":"新4A_新经分_从账号与角色授权关系变更接口",
                                "code":"50.5002.updateAcctAuthor",
                                "children":[

                                ]
                            },
                            {
                                "id":"12176",
                                "type":"",
                                "name":"test22222",
                                "code":"test222",
                                "children":[

                                ]
                            },
                            {
                                "id":"12177",
                                "type":"",
                                "name":"test33333",
                                "code":"2323",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"2548",
                "type":"",
                "name":"中国铁塔门户域",
                "code":"30",
                "children":[
                    {
                        "id":"2703",
                        "type":"",
                        "name":"员工健康关怀平台",
                        "code":"30.3004",
                        "children":[
                            {
                                "id":"10846",
                                "type":"",
                                "name":"4A_健康平台_人员账号同步",
                                "code":"30.3004.UpdateAppAcctSoap",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2663",
                        "type":"",
                        "name":"响应服务中心",
                        "code":"30.3003",
                        "children":[
                            {
                                "id":"10866",
                                "type":"",
                                "name":"4A_响应中心_账号角色授权服务",
                                "code":"30.3003.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"10766",
                                "type":"",
                                "name":"门户_响应中心_站点信息",
                                "code":"30.3003.MDMSITE",
                                "children":[

                                ]
                            },
                            {
                                "id":"10769",
                                "type":"",
                                "name":"4A_响应中心_人员账号信息",
                                "code":"30.3003.UpdateAppAcctSoap",
                                "children":[

                                ]
                            },
                            {
                                "id":"11287",
                                "type":"",
                                "name":"PDSS_响应中心_站址信息",
                                "code":"30.3003.GG_INTERFACE_Syn",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2763",
                        "type":"",
                        "name":"运营商门户",
                        "code":"30.3005",
                        "children":[
                            {
                                "id":"10936",
                                "type":"",
                                "name":"CRM_运营商门户_业务推送接口",
                                "code":"30.3005.PushService",
                                "children":[

                                ]
                            },
                            {
                                "id":"10937",
                                "type":"",
                                "name":"MDM_运营商门户_项目状态信息",
                                "code":"30.3005.MDMPROJECTSSTATES",
                                "children":[

                                ]
                            },
                            {
                                "id":"10938",
                                "type":"",
                                "name":"MDM_运营商门户_项目信息接口",
                                "code":"30.3005.MDMPROJECTS",
                                "children":[

                                ]
                            },
                            {
                                "id":"10935",
                                "type":"",
                                "name":"4A_运营商门户_内部帐号门户角色变更反向接口",
                                "code":"30.3005.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11507",
                                "type":"",
                                "name":"门户域-运营商门户-枚举值推送接口",
                                "code":"30.3005.enumerationAdd",
                                "children":[

                                ]
                            },
                            {
                                "id":"11994",
                                "type":"",
                                "name":"CRM_运营商门户_服务终止归档接口",
                                "code":"30.3005.30.3005.towerTerminationSyncService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11996",
                                "type":"",
                                "name":"CRM_门户_服务终止申请导入接口",
                                "code":"30.3005.towerTerminationImport",
                                "children":[

                                ]
                            },
                            {
                                "id":"11995",
                                "type":"",
                                "name":"CRM_运营商门户_服务终止确认接口",
                                "code":"30.3005.30.3005.CustomerTerminationConfirmService",
                                "children":[

                                ]
                            },
                            {
                                "id":"12087",
                                "type":"",
                                "name":"CRM_运营商门户_传输室分推送接口",
                                "code":"30.3005.OtherPushService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11569",
                                "type":"",
                                "name":"门户域-运营商门户-需求订单取消确认接口",
                                "code":"30.3005.demandOrderCancelConfirmation",
                                "children":[

                                ]
                            },
                            {
                                "id":"11410",
                                "type":"",
                                "name":"选址_运营商门户_站址筛查结果同步确认接口",
                                "code":"30.3005.ScreeningResultsFeedbackService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11471",
                                "type":"",
                                "name":"CRM_运营商门户-电信业务推送接口",
                                "code":"30.3005.TelecomPushService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11288",
                                "type":"",
                                "name":"客户经理需求承接回复接口",
                                "code":"30.3005.RequestUndertakeReplyService",
                                "children":[

                                ]
                            },
                            {
                                "id":"11525",
                                "type":"",
                                "name":"门户域_运营商门户_枚举值推送接口",
                                "code":"30.3005.ggkenumPush",
                                "children":[

                                ]
                            },
                            {
                                "id":"11387",
                                "type":"",
                                "name":"CRM_运营商门户_订单取消与变更提交接口",
                                "code":"30.3005.RequestCancelAndAlterSubmit",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2867",
                        "type":"",
                        "name":"测试管理平台",
                        "code":"30.3011",
                        "children":[
                            {
                                "id":"11232",
                                "type":"",
                                "name":"4A_测试_账号角色授权服务",
                                "code":"30.3011.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11233",
                                "type":"",
                                "name":"4A_测试_账号变更服务",
                                "code":"30.3011.UpdateAppAcctSoap",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2965",
                        "type":"",
                        "name":"新业务拓展平台",
                        "code":"30.3014",
                        "children":[
                            {
                                "id":"11915",
                                "type":"",
                                "name":"4A_新业务_帐号角色授权变更接口",
                                "code":"30.3014.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11918",
                                "type":"",
                                "name":"新4A_新业务_账号变更正向接口",
                                "code":"30.3014.UpdateAppAcctServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11905",
                                "type":"",
                                "name":"合同_新业务_查询合同数据",
                                "code":"30.3014.doSyncContractInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"11913",
                                "type":"",
                                "name":"合同_新业务_合同状态更新接口",
                                "code":"30.3014.updateContractState",
                                "children":[

                                ]
                            },
                            {
                                "id":"11914",
                                "type":"",
                                "name":"4A_新业务_账号变更正向接口",
                                "code":"30.3014.UpdateAppAcctSoap",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2863",
                        "type":"",
                        "name":"需求管理平台",
                        "code":"30.3007",
                        "children":[
                            {
                                "id":"11645",
                                "type":"",
                                "name":"4A_服务工单_组织机构变更",
                                "code":"30.3007.UpdateAppOrgServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11262",
                                "type":"",
                                "name":"门户_需求_账号角色授权服务",
                                "code":"30.3007.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11263",
                                "type":"",
                                "name":"门户_需求_账号变更服务",
                                "code":"30.3007.UpdateAppAcctSoap",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2866",
                        "type":"",
                        "name":"研发管理平台",
                        "code":"30.3010",
                        "children":[
                            {
                                "id":"11230",
                                "type":"",
                                "name":"4A_研发_账号角色授权服务",
                                "code":"30.3010.UpdateAppAcctAuthorServices",
                                "children":[

                                ]
                            },
                            {
                                "id":"11231",
                                "type":"",
                                "name":"4A_研发_账号变更服务",
                                "code":"30.3010.UpdateAppAcctSoap",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"2903",
                        "type":"",
                        "name":"创新管理平台",
                        "code":"30.3012",
                        "children":[
                            {
                                "id":"11445",
                                "type":"",
                                "name":"财务_创新_付款完成接口",
                                "code":"30.3012.infoSync",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"3056",
                "type":"",
                "name":"业务编排测试",
                "code":"2",
                "children":[
                    {
                        "id":"3065",
                        "type":"",
                        "name":"业务编排",
                        "code":"2.1001",
                        "children":[
                            {
                                "id":"12125",
                                "type":"",
                                "name":"云端施工接口（测试）",
                                "code":"2.1001.dispatchOrder",
                                "children":[

                                ]
                            },
                            {
                                "id":"12126",
                                "type":"",
                                "name":"测试",
                                "code":"2.1001.test",
                                "children":[

                                ]
                            },
                            {
                                "id":"12127",
                                "type":"",
                                "name":"云专线详情查询接口（测试）",
                                "code":"2.1001.getDetailDCICn2",
                                "children":[

                                ]
                            },
                            {
                                "id":"12128",
                                "type":"",
                                "name":"VLan信息查询接口（测试）",
                                "code":"2.1001.getDetailVlanInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12129",
                                "type":"",
                                "name":"工单报竣通知接口（测试）",
                                "code":"2.1001.orderFishNotice",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"3085",
                        "type":"",
                        "name":"服务开通系统",
                        "code":"2.1002",
                        "children":[
                            {
                                "id":"12132",
                                "type":"",
                                "name":"云端施工接口（测试）",
                                "code":"2.1002.dispatchOrder",
                                "children":[

                                ]
                            },
                            {
                                "id":"12133",
                                "type":"",
                                "name":"云专线详情查询接口（测试）",
                                "code":"2.1002.getDetailDCICn2",
                                "children":[

                                ]
                            },
                            {
                                "id":"12134",
                                "type":"",
                                "name":"VLan信息查询接口（测试）",
                                "code":"2.1002.getDetailVlanInfo",
                                "children":[

                                ]
                            },
                            {
                                "id":"12135",
                                "type":"",
                                "name":"工单报竣通知接口（测试）",
                                "code":"2.1002.orderFishNotice",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"3105",
                        "type":"",
                        "name":"河南云管平台",
                        "code":"2.0",
                        "children":[
                            {
                                "id":"12145",
                                "type":"",
                                "name":"创建默认VPC",
                                "code":"2.0.VPC001",
                                "children":[

                                ]
                            },
                            {
                                "id":"12146",
                                "type":"",
                                "name":"创建VPC",
                                "code":"2.0.VPC002",
                                "children":[

                                ]
                            },
                            {
                                "id":"12147",
                                "type":"",
                                "name":"创建子网",
                                "code":"2.0.VPC003",
                                "children":[

                                ]
                            },
                            {
                                "id":"12148",
                                "type":"",
                                "name":"创建安全组",
                                "code":"2.0.VPC004",
                                "children":[

                                ]
                            },
                            {
                                "id":"12149",
                                "type":"",
                                "name":"创建安全组规则",
                                "code":"2.0.VPC005",
                                "children":[

                                ]
                            },
                            {
                                "id":"12150",
                                "type":"",
                                "name":"下订购单",
                                "code":"2.0.VPC006",
                                "children":[

                                ]
                            },
                            {
                                "id":"12151",
                                "type":"",
                                "name":"用户订单确认",
                                "code":"2.0.VPC007",
                                "children":[

                                ]
                            },
                            {
                                "id":"12152",
                                "type":"",
                                "name":"查询订单详细信息",
                                "code":"2.0.VPC008",
                                "children":[

                                ]
                            },
                            {
                                "id":"12153",
                                "type":"",
                                "name":"查询资源详细信息",
                                "code":"2.0.VPC009",
                                "children":[

                                ]
                            },
                            {
                                "id":"12154",
                                "type":"",
                                "name":"CRM报竣",
                                "code":"2.0.VPC010",
                                "children":[

                                ]
                            },
                            {
                                "id":"12155",
                                "type":"",
                                "name":"测试",
                                "code":"2.0.test",
                                "children":[

                                ]
                            },
                            {
                                "id":"12165",
                                "type":"",
                                "name":"回调接口服务",
                                "code":"2.0.HD",
                                "children":[

                                ]
                            },
                            {
                                "id":"12178",
                                "type":"",
                                "name":"测试1",
                                "code":"2.0.test1",
                                "children":[

                                ]
                            },
                            {
                                "id":"12207",
                                "type":"",
                                "name":"云调工单施工接口",
                                "code":"2.0.RAN001",
                                "children":[

                                ]
                            },
                            {
                                "id":"12208",
                                "type":"",
                                "name":"云调详情查询",
                                "code":"2.0.RAN002",
                                "children":[

                                ]
                            },
                            {
                                "id":"12209",
                                "type":"",
                                "name":"云调工单报竣通知",
                                "code":"2.0.RAN003",
                                "children":[

                                ]
                            },
                            {
                                "id":"12210",
                                "type":"",
                                "name":"资源配置",
                                "code":"2.0.RAN004",
                                "children":[

                                ]
                            },
                            {
                                "id":"12211",
                                "type":"",
                                "name":"ISAP施工",
                                "code":"2.0.RAN005",
                                "children":[

                                ]
                            },
                            {
                                "id":"12212",
                                "type":"",
                                "name":"资源报竣",
                                "code":"2.0.RAN006",
                                "children":[

                                ]
                            },
                            {
                                "id":"12213",
                                "type":"",
                                "name":"CRM报竣（云专线）",
                                "code":"2.0.RAN007",
                                "children":[

                                ]
                            },
                            {
                                "id":"12235",
                                "type":"",
                                "name":"演示原子服务",
                                "code":"2.0.YS1",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"3125",
                        "type":"",
                        "name":"云调系统",
                        "code":"2.1003",
                        "children":[
                            {
                                "id":"12228",
                                "type":"",
                                "name":"测试服务",
                                "code":"2.1003.test",
                                "children":[

                                ]
                            },
                            {
                                "id":"12234",
                                "type":"",
                                "name":"演示服务",
                                "code":"2.1003.YSFW",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"2623",
                "type":"",
                "name":"test_服务域1",
                "code":"69",
                "children":[
                    {
                        "id":"2890",
                        "type":"",
                        "name":"test99",
                        "code":"70.0002",
                        "children":[
                            {
                                "id":"12179",
                                "type":"",
                                "name":"test222333",
                                "code":"23242433",
                                "children":[

                                ]
                            },
                            {
                                "id":"12180",
                                "type":"",
                                "name":"test2222",
                                "code":"2424",
                                "children":[

                                ]
                            },
                            {
                                "id":"12186",
                                "type":"",
                                "name":"test33",
                                "code":"53522",
                                "children":[

                                ]
                            },
                            {
                                "id":"12189",
                                "type":"",
                                "name":"eeee",
                                "code":"2222",
                                "children":[

                                ]
                            },
                            {
                                "id":"12190",
                                "type":"",
                                "name":"eeee",
                                "code":"3333",
                                "children":[

                                ]
                            },
                            {
                                "id":"12193",
                                "type":"",
                                "name":"test2222",
                                "code":"111",
                                "children":[

                                ]
                            },
                            {
                                "id":"12194",
                                "type":"",
                                "name":"test2222",
                                "code":"eeeee",
                                "children":[

                                ]
                            },
                            {
                                "id":"12196",
                                "type":"",
                                "name":"testttt11",
                                "code":"ttttteest",
                                "children":[

                                ]
                            },
                            {
                                "id":"12197",
                                "type":"",
                                "name":"我测试一下",
                                "code":"ttttteeest_zz",
                                "children":[

                                ]
                            },
                            {
                                "id":"12198",
                                "type":"",
                                "name":"test222",
                                "code":"70.0002.23",
                                "children":[

                                ]
                            },
                            {
                                "id":"12214",
                                "type":"",
                                "name":"test333311111",
                                "code":"test2222",
                                "children":[

                                ]
                            },
                            {
                                "id":"12219",
                                "type":"",
                                "name":"test3331",
                                "code":"222226666",
                                "children":[

                                ]
                            },
                            {
                                "id":"12220",
                                "type":"",
                                "name":"测试一下",
                                "code":"70.0002.tttteest1112",
                                "children":[

                                ]
                            },
                            {
                                "id":"12225",
                                "type":"",
                                "name":"我i来测试一下下",
                                "code":"70.0002.tttteeest",
                                "children":[

                                ]
                            },
                            {
                                "id":"12226",
                                "type":"",
                                "name":"特色t444",
                                "code":"70.0002.wwrewre22221",
                                "children":[

                                ]
                            },
                            {
                                "id":"12229",
                                "type":"",
                                "name":"我来测试下调用",
                                "code":"70.0002.ttttteeest111",
                                "children":[

                                ]
                            },
                            {
                                "id":"12230",
                                "type":"",
                                "name":"我来测试下调用2",
                                "code":"70.0002.tttttt1111",
                                "children":[

                                ]
                            },
                            {
                                "id":"12252",
                                "type":"",
                                "name":"我也测试一下",
                                "code":"70.0002.001",
                                "children":[

                                ]
                            },
                            {
                                "id":"12265",
                                "type":"",
                                "name":"test2222",
                                "code":"70.0002.1111",
                                "children":[

                                ]
                            }
                        ]
                    },
                    {
                        "id":"3254",
                        "type":"",
                        "name":"我测试一下",
                        "code":"69.tttteeest",
                        "children":[
                            {
                                "id":"12227",
                                "type":"",
                                "name":"tes22222",
                                "code":"69.tttteeest.1111111",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"",
                "type":"",
                "name":"",
                "code":"",
                "children":[
                    {
                        "id":"",
                        "type":"",
                        "name":"",
                        "code":"",
                        "children":[
                            {
                                "id":"12203",
                                "type":"",
                                "name":"测试服务",
                                "code":"200",
                                "children":[

                                ]
                            },
                            {
                                "id":"12206",
                                "type":"",
                                "name":"test222222211",
                                "code":"test322",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"3250",
                "type":"",
                "name":"测试服务域108",
                "code":"10013",
                "children":[
                    {
                        "id":"3253",
                        "type":"",
                        "name":"测试服务商001",
                        "code":"10013.001",
                        "children":[
                            {
                                "id":"12216",
                                "type":"",
                                "name":"测试服务001",
                                "code":"100",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"3268",
                "type":"",
                "name":"天翼云",
                "code":"01",
                "children":[
                    {
                        "id":"3275",
                        "type":"",
                        "name":"天翼合营平台",
                        "code":"01.1",
                        "children":[
                            {
                                "id":"12236",
                                "type":"",
                                "name":"创建默认VPC",
                                "code":"01.1.VPC01",
                                "children":[

                                ]
                            },
                            {
                                "id":"12237",
                                "type":"",
                                "name":"创建安全组",
                                "code":"01.1.VPC02",
                                "children":[

                                ]
                            },
                            {
                                "id":"12238",
                                "type":"",
                                "name":"创建安全组规则",
                                "code":"01.1.VPC03",
                                "children":[

                                ]
                            },
                            {
                                "id":"12239",
                                "type":"",
                                "name":"创建子网",
                                "code":"01.1.VPC04",
                                "children":[

                                ]
                            },
                            {
                                "id":"12240",
                                "type":"",
                                "name":"创建VPC",
                                "code":"01.1.VPC05",
                                "children":[

                                ]
                            },
                            {
                                "id":"12241",
                                "type":"",
                                "name":"用户订单确认",
                                "code":"01.1.VPC06",
                                "children":[

                                ]
                            },
                            {
                                "id":"12242",
                                "type":"",
                                "name":"下订购单",
                                "code":"01.1.VPC07",
                                "children":[

                                ]
                            },
                            {
                                "id":"12243",
                                "type":"",
                                "name":"查询订单详细信息",
                                "code":"01.1.VPC08",
                                "children":[

                                ]
                            },
                            {
                                "id":"12244",
                                "type":"",
                                "name":"查询资源详细信息",
                                "code":"01.1.VPC09",
                                "children":[

                                ]
                            },
                            {
                                "id":"12245",
                                "type":"",
                                "name":"CRM报竣",
                                "code":"01.1.VPC10",
                                "children":[

                                ]
                            },
                            {
                                "id":"12246",
                                "type":"",
                                "name":"回调接口服务",
                                "code":"01.1.VPCHD",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"3269",
                "type":"",
                "name":"云专线",
                "code":"02",
                "children":[
                    {
                        "id":"3276",
                        "type":"",
                        "name":"云调系统",
                        "code":"02.1",
                        "children":[
                            {
                                "id":"12247",
                                "type":"",
                                "name":"云调工单施工接口",
                                "code":"02.1.IPRAN01",
                                "children":[

                                ]
                            },
                            {
                                "id":"12248",
                                "type":"",
                                "name":"云调详情查询",
                                "code":"02.1.IPRAN02",
                                "children":[

                                ]
                            },
                            {
                                "id":"12249",
                                "type":"",
                                "name":"云调工单报竣通知",
                                "code":"02.1.IPRAN03",
                                "children":[

                                ]
                            },
                            {
                                "id":"12250",
                                "type":"",
                                "name":"CRM报竣",
                                "code":"02.1.IPRAN04",
                                "children":[

                                ]
                            },
                            {
                                "id":"12251",
                                "type":"",
                                "name":"回调服务接口",
                                "code":"02.1.IPRANHD",
                                "children":[

                                ]
                            },
                            {
                                "id":"12253",
                                "type":"",
                                "name":"资源配置",
                                "code":"02.1.U",
                                "children":[

                                ]
                            },
                            {
                                "id":"12254",
                                "type":"",
                                "name":"ISAP施工",
                                "code":"02.1.A",
                                "children":[

                                ]
                            },
                            {
                                "id":"12255",
                                "type":"",
                                "name":"资源报竣",
                                "code":"02.1.B",
                                "children":[

                                ]
                            },
                            {
                                "id":"12256",
                                "type":"",
                                "name":"CRM报竣",
                                "code":"02.1.ER",
                                "children":[

                                ]
                            },
                            {
                                "id":"12257",
                                "type":"",
                                "name":"ASBR设备",
                                "code":"02.1.ASBR",
                                "children":[

                                ]
                            },
                            {
                                "id":"12258",
                                "type":"",
                                "name":"云POP点设备",
                                "code":"02.1.POP",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"3270",
                "type":"",
                "name":"网元类能力",
                "code":"03",
                "children":[
                    {
                        "id":"3277",
                        "type":"",
                        "name":"中盈网管系统",
                        "code":"03.1",
                        "children":[
                            {
                                "id":"12259",
                                "type":"",
                                "name":"云调工单施工接口",
                                "code":"03.1.YDGD",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"3279",
                "type":"",
                "name":"业务编排-天翼云",
                "code":"05",
                "children":[
                    {
                        "id":"3288",
                        "type":"",
                        "name":"天翼合营平台",
                        "code":"05.1",
                        "children":[
                            {
                                "id":"12266",
                                "type":"",
                                "name":"天翼云回调",
                                "code":"05.1.VPCHD",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id":"3280",
                "type":"",
                "name":"业务编排-云专线",
                "code":"06",
                "children":[
                    {
                        "id":"3289",
                        "type":"",
                        "name":"云调系统",
                        "code":"06.1",
                        "children":[
                            {
                                "id":"12267",
                                "type":"",
                                "name":"云专线回调",
                                "code":"06.1.IPRANHD",
                                "children":[

                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]