

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>
	�ʼ�����
</title>
    <script type="text/javascript" src="../../js/jquery.js"></script>
    <script type="text/javascript" src="../../js/layer/layer.min.js"></script>
     <link href="Js/uploadify/uploadify.css" rel="stylesheet" type="text/css" />
    <script src="Js/uploadify/jquery.uploadify-3.1.js" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/OpenDiv.js"></script>
    <script charset="utf-8" src="Js/Handle.js?v=1"></script>
    <script charset="utf-8" src="Js/pager.js"></script>
    <script charset="utf-8" src="Js/Email.js"></script>
    
    <link href="../../EmailCenter/Css/Email.css" rel="stylesheet" /><link href="../../SFOAHtml/themes/iframe.css" rel="stylesheet" /><link href="../../SFOAHtml/themes/default/css/ueditor.min.css" rel="stylesheet" />
    <script charset="utf-8" src="../../SFOAHtml/ueditor.config.js"></script>
    <script charset="utf-8" src="../../SFOAHtml/ueditor.all.js"></script>
    <script charset="utf-8" src="../../SFOAHtml/lang/zh-cn/zh-cn.js"></script>
    <style>
        .mail-nav{
            display:none;
        }
        .mail-main{
            left:10px;
        }
        .mail-write{
            min-width:400px;
        }
        .write-cont{
            min-width:400px;
        }
    </style>
</head>
<body>
    <form name="frm_email" method="post" action="./Write.aspx" id="frm_email">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTk1MzE2Njc2NGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgQFB3BvcFNzbDEFB3BvcFNzbDAFCHNtdHBTc2wxBQhzbXRwU3NsMDkrSb1nY4GmutchqRGfYTNxDtlYObfObnso6aOBKD4+" />

<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="A4250FCC" />
        <input type="hidden" id="isrecving" value="0" />
        <div class="mail-nav">
            <div class="mail-nav-top">
                <div id="mailRecv" class="receive option"><span class="mailrecv-icon"></span><span style="padding-left:60px;">�ռ�</span></div>
                <div id="mailSend" class="send option"><span class="mailsend-icon"></span><span style="padding-left:60px;">д��</span></div>
            </div>
            <div id="mailSearch" class="mail-search">
                <div title="��������" class="search-icon"></div>
                <input type="text" id="searchtxt" class="search-txt" value="�ʼ�����..." />
            </div>
            <div class="mail-nav-public">
                <ul>
                    <li>
                        <div id="mailUnread" class="mail-nav-item"> <span>δ���ʼ�</span><strong></strong> </div>
                    </li>
                     <li>
                        <div id="mailStar" class="mail-nav-item"> <span>�Ǳ��ʼ�</span><span class="starmail-icon"></span></div>
                    </li>
                    <li class="mailfolder">
                       <span class="floder-icon"></span>
                       <div class="mail-nav-item item-floder"><span>�ʼ���</span><span class="floder-addicon" title="����ʼ���">���</span></div>
                       <div id="folderInfo" class="contact-info  contactgroup-info">
                          <input type="hidden" id="curFolderID" />
                          <div class="contact-info-row">
                              <div class="contact-info-col col-first">�ʼ�����:</div>
                              <div class="contact-info-col col-second col-inputtxt">
                                  <input type="text" id="foldername" maxlength="15" class="col-inputtxt" />
                                  <label style="color:red">*</label>
                              </div>
                              <div class="contact-info-col col-third"></div>
                          </div>
                          <div class="contact-info-row contact-row-option">
                              <div class="contact-info-col col-first">&nbsp;</div>
                              <div class="contact-info-col col-second ">
                                  <div id="folder_save" class="contact-btn contact-btn-save"><span>�� ��</span></div>
                                  <div id="folder_cancel" class="contact-btn contact-btn-cancel"><span>ȡ ��</span></div>
                              </div>
                              <div class="contact-info-col col-third"></div>
                          </div>
                     </div>
                        <div id="floder-list">
                            
                        </div>

                    </li>
                    <li>
                        <div id="mailAddresses" class="mail-nav-item">
                            <span>ͨѶ¼</span>
                        </div>
                    </li>
                    <li>
                        <div id="mailDraft" class="mail-nav-item"><span>�ݸ���</span><strong></strong></div>
                    </li>
                    <li>
                        <div id="mailRecover" class="mail-nav-item"><span>������</span><strong>(5)</strong></div>
                    </li>
                </ul>
            </div>
            <div class="mail-nav-inside">
                <dl>
                    <dt class="mail-dl mail-dl-title"><span><strong>�ڲ��ʼ�</strong></span></dt>
                    <dd id="mailInRecv" class="mail-dl">
                        <div><span>�ռ���</span><strong></strong></div>
                    </dd>
                    <dd id="mailInSend" class="mail-dl">
                        <div><span>�ѷ���</span><strong></strong></div>
                    </dd>
                </dl>
            </div>
            <div class="mail-nav-outside">
                <dl>
                    <dt class="mail-dl mail-dl-title"><span><strong>�ⲿ�ʼ�</strong></span></dt>
                    <dd id="mailOutRecv" class="mail-dl">
                        <div><span>�ռ���</span><strong></strong></div>
                    </dd>
                    <dd id="mailOutSend" class="mail-dl">
                        <div><span>�ѷ���</span><strong></strong></div>
                    </dd>
                     <dd id="mailSet" class="mail-dl">
                        <div><span>�� ��</span><strong></strong></div>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="mail-content">
            <div id="contactInfo" class="contact-info">
                <input id="curContactID" type="hidden" />
                <div class="contact-info-row">
                    <div class="contact-info-col col-first">��ϵ��ʽ:</div>
                    <div class="contact-info-col col-second">
                        <input id="contacttype_in" class="contact-type" type="radio" value="1" checked="checked" name="contacttype" /><label for="contacttype_in">�ڲ�</label>
                        <input id="contacttype_out" class="contact-type" type="radio" value="2" name="contacttype" /><label for="contacttype_in">�ⲿ</label>
                    </div>
                    <div class="contact-info-col col-third"></div>
                </div>
                <input type="hidden" id="contactcode" />
                <div class="contact-info-row contact-namein-row">
                    <div class="contact-info-col col-first">����:</div>
                    <div class="contact-info-col col-second col-inputtxt">
                        <input type="text" id="contactnameIn" disabled="disabled" maxlength="15" class="col-inputtxt" />
                        <label style="color: red">*</label>
                    </div>
                    <div class="contact-info-col col-third">
                        <div class="seletcontact">ѡ��</div>
                    </div>
                </div>
                <div class="contact-info-row contact-nameout-row">
                    <div class="contact-info-col col-first">����:</div>
                    <div class="contact-info-col col-second col-inputtxt">
                        <input type="text" id="contactnameOut" maxlength="25" class="col-inputtxt" />
                        <label style="color: red">*</label>
                    </div>
                    <div class="contact-info-col col-third"></div>
                </div>
                <div class="contact-info-row contact-mail-row">
                    <div class="contact-info-col col-first">�ʼ���ַ:</div>
                    <div class="contact-info-col col-second ">
                        <input type="text" id="contactmail" maxlength="50" class="col-inputtxt" />
                        <label style="color: red">*</label>
                    </div>
                    <div class="contact-info-col col-third"></div>
                </div>
                <div class="contact-info-row">
                    <div class="contact-info-col col-first">����:</div>
                    <div class="contact-info-col col-second ">
                        <select id="contactgroups" class="col-inputsel">
                        </select>
                    </div>
                    <div class="contact-info-col col-third"></div>
                </div>
                <div class="contact-info-row contact-row-option">
                    <div class="contact-info-col col-first">&nbsp;</div>
                    <div class="contact-info-col col-second ">
                        <div id="contact_save" class="contact-btn contact-btn-save"><span>�� ��</span></div>
                        <div id="contact_cancel" class="contact-btn contact-btn-cancel"><span>ȡ ��</span></div>
                    </div>
                    <div class="contact-info-col col-third"></div>
                </div>
            </div>
            <div id="contactGroupInfo" class="contact-info  contactgroup-info">
                <input type="hidden" id="curContactGroupID" />
                <div class="contact-info-row">
                    <div class="contact-info-col col-first">����:</div>
                    <div class="contact-info-col col-second col-inputtxt">
                        <input type="text" id="contactgroupname" maxlength="15" class="col-inputtxt" />
                        <label style="color: red">*</label>
                    </div>
                    <div class="contact-info-col col-third"></div>
                </div>
                <div class="contact-info-row contact-row-option">
                    <div class="contact-info-col col-first">&nbsp;</div>
                    <div class="contact-info-col col-second ">
                        <div id="contactgroup_save" class="contact-btn contact-btn-save"><span>�� ��</span></div>
                        <div id="contactgroup_cancel" class="contact-btn contact-btn-cancel"><span>ȡ ��</span></div>
                    </div>
                    <div class="contact-info-col col-third"></div>
                </div>
            </div>
            <input type="hidden" id="isHaveUnread" value="0" />
            <input type="hidden" id="recv_pagesize" value="15" />
            <input type="hidden" id="recv_totalrows" value="0" />
            <input type="hidden" id="recv_pages" value="0" />
            <input type="hidden" id="msgtipflag" value="N" />
            <div class="mail-recv  mail-main " data-type="0">
                <div class="mail-toolbar">
                    <div class="tool tool_select">
                        <input type="checkbox" class="mails-check" />
                        <span class="drop-icon"></span>
                         <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                            <div class="arrow-up arrow-up-select"></div>
                            <div data-id="1" class="tool-menu-item"><span>ȫѡ</span></div>
                            <div data-id="2" class="tool-menu-item"><span>��ѡ</span></div>
                            <div data-id="3" class="tool-menu-item"><span>�Ѷ�</span></div>
                            <div data-id="4" class="tool-menu-item"><span>δ��</span></div>
                        </div>
                    </div>
                    <div id="recv_del" class="tool tool_del">
                        <span>ɾ ��</span>
                    </div>
                    <div class="tool tool_lookup" data-type="3">
                        <span>�� ��</span>
                        <span class="drop-icon"></span>
                        <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                            <div class="arrow-up arrow-up-lookup"></div>
                            <div data-id="1" class="tool-menu-item"><span>�ڲ��ʼ�</span></div>
                            <div data-id="2" class="tool-menu-item"><span>�ⲿ�ʼ�</span></div>
                            <div data-id="3" class="tool-menu-item"><span>�����ʼ�</span></div>
                        </div>
                    </div>
                    <div id="recv_mark" class="tool tool_mark">
                        <span>�� ��</span>
                        <span class="drop-icon"></span>
                        <div class="tool-blankspace"></div>
                        <div class="tool-menu ">
                            <div class="arrow-up arrow-up-mark"></div>
                            <div data-id="1" class="tool-menu-item"><span>�Ѷ�</span></div>
                           
                            <div data-id="3" class="tool-menu-item"><span>ȫ����Ϊ�Ѷ�</span></div>
                            <div class="menu-divided"></div>
                            <div data-id="4" class="tool-menu-item"><span>�ö��ʼ�</span></div>
                            <div data-id="5" class="tool-menu-item"><span>ȡ���ö�</span></div>
                            <div class="menu-divided"></div>
                            <div data-id="6" class="tool-menu-item"><span>����Ǳ�</span></div>
                            <div data-id="7" class="tool-menu-item"><span>ȡ���Ǳ�</span></div>
                        </div>
                    </div>
                    <div  id="recv_move" class="tool tool_move">
                        <span>�� ��</span>
                        <span class="drop-icon"></span>
                        <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                        <div class="arrow-up arrow-up-move"></div>
                        <div class="list-floders"></div>
                        </div>
                    </div>
                    <div id="recv_refresh" class="tool tool_refresh">
                        <span>ˢ ��</span>
                    </div>
                </div>
                <div class="mail-datas">
                    <div class="mail-rows">
              
                    </div>
                    <div id="mailsrecv-page" class="mails-page" data-type="0"></div>
                </div>
            </div>
            <div class="mail-write mail-main">
                <input type="hidden" id="draftMailID" value="" />
                <div class="write-cont">
                    <div class="write-top">
                        <div class="write-top-toolbar">
                            <div class="write-tooll tool_send">
                                <span>�� ��</span>
                                
                            </div>
                            <div class="write-tooll tool_savedraft"><span>��ݸ�</span></div> 
                            <div class="write-tooll tool_reset"><span>�� д</span></div>
                            
                            <div class="write-toolr">
                                <div class="write-toolr-item toolr-copysend" data-status="0"><span>����</span></div>
                                <div class="write-toolr-item toolr-bccsend" data-status="0"><span>����</span></div>
                                <div class="write-toolr-item toolr-groupsend" data-status="0"><span>��������</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="write-middle">      
                        <div class="write-header">
                           <table class="write-input-rows" cellspacing="0" >
                               <tr class="write-input-row input-send">
                                   <td class="input-title">�ռ��ˣ�</td>
                                   <td class="input-content">
                                       <div class="send-addresss">
                                       
                                           <input class="input-txt" type="text" data-type="0" maxlength="100" />
                                       </div>
                                       <div class="input-match"><ul></ul></div>
                                   </td>
                                   <td class="input-option"></td>
                               </tr>
                               <tr class="write-input-row input-groupsend">
                                   <td class="input-title input-title-groupsend">�������ͣ�</td>
                                   <td class="input-content">
                                       <div class="send-addresss">
                                           <input class="input-txt" type="text" data-type="0" maxlength="100" />
                                       </div>
                                       <div class="input-match"><ul></ul></div>
                                   </td>
                                   <td class="input-option"></td>
                               </tr>
                               <tr class="write-input-row input-copysend">
                                   <td class="input-title">�����ˣ�</td>
                                   <td class="input-content">
                                       <div class="send-addresss">
                                           <input class="input-txt" type="text" data-type="0" maxlength="100" />
                                       </div>
                                       <div class="input-match"><ul></ul></div>
                                   </td>
                                   <td class="input-option"></td>
                               </tr>
                               <tr class="write-input-row input-bccsend">
                                   <td class="input-title">�����ˣ�</td>
                                   <td class="input-content">
                                       <div class="send-addresss">
                                           <input class="input-txt" type="text" maxlength="100" />
                                       </div>
                                       <div class="input-match"><ul></ul></div>
                                   </td>
                                   <td class="input-option"></td>
                               </tr>
                               <tr class="write-input-row input-themetxt">
                                   <td class="input-title">��&nbsp;&nbsp;�⣺</td>
                                   <td class="input-content" colspan="2">
                                       <div class="send-theme">
                                           <input class="input-theme" type="text" />
                                       </div>
                                   </td>

                               </tr>
                           </table>
                            <div class="write-header-attachment">
                                <div class="attachment-icon"></div>
                                <div id="fileQueue"></div>
                                <input id="uploadify" name="uploadify" class="attachment-btn-file" type="file" multiple="" />
                                
                            </div>
                            <div id="upload_flag" style="display:none;line-height:30px">�����ϴ���ʾ��<a href="http://www.adobe.com/support/flashplayer/downloads.html" target="_blank" style="cursor:pointer">���Ȱ�װflash player���</a> </div>
                        </div>
                        <div class="write-editor">
                            
                            <textarea id="editor" type="text/plain" ></textarea>
                        </div>
                        <div class="write-option">
                            <div class="write-option-item">
                                <input type="checkbox" id="option-urgent" /><label for="option-urgent">����</label>
                            </div>
                            <div class="write-option-item">
                                <input type="checkbox" id="option-receipt" /><label for="option-receipt">�Ѷ���ִ</label>
                            </div>
                            <div class="write-option-item">
                                <input type="checkbox" id="option-msg"   /><label for="option-msg">��������(�ڲ�����)</label>
                            </div>
                            <div class="write-option-item option-send-msgtype option-nochecked">
                                <span>(</span>
                                <input type="radio" name="option-msg" id="option-msgmain" checked="checked" disabled="disabled" />
                                <label for="option-msgmain">������Ҫ����</label>
                                <input type="radio" name="option-msg" id="option-msgall" disabled="disabled" />
                                <label for="option-msgall">�������к���</label>
                                <span>)</span>
                            </div>
                            
                        </div>
                        <div class="write-btn">
                            <div class="write-tooll tool_send">
                                <span>�� ��</span>
                                
                            </div>
                            
                           
                        </div>
                    </div>
                </div>
                <div class="mail-addresses">
                    
                    <div class="addresses-title">
                        <span>ͨѶ¼</span>
                    </div>
                    <div class="addresses-list">
                        <div class="addresses-list-area addresses-nearly">
                            <span class="addr-icon show"></span>
                            <div class="addresses-list-item addr-floder"><span>�����ϵ��</span></div>
                            <ul></ul>
                        </div>
                        <div class="list-divided"></div>
                        <div class="addresses-list-area addresses-groups">
                            <span class="addr-icon show"></span>
                            <div class="addresses-list-item addr-floder"><span>��ϵ��</span></div>
                            <ul class="addresses-dept-list"></ul>
                        </div>
                        <div class="list-divided"></div>
                        <div class="addresses-list-area addresses-depts">
                             <div class='addresses-dept'> <span class='addr-icon'></span> <div class='addresses-list-item addr-floder addr-group' data-id='5' data-name='�ܾ���'> <div class='addr-name'><span>�ܾ���</span><span>(23)</span></div> <span class='addr-addgroup'>��Ӹ���</span> </div> <ul class='addresses-dept-list'> <li> <div class='addresses-list-item item-addr'   data-usercode='admin' data-username='ϵͳ����Ա' data-mail='' data-mailname=''  data-type='0'>ϵͳ����Ա</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='test' data-username='�����û�' data-mail='' data-mailname=''  data-type='0'>�����û�</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='sj' data-username='�ν�' data-mail='' data-mailname=''  data-type='0'>�ν�</div> </li><li> <span class='addr-icon'></span> <div class='addresses-list-item addr-floder addr-group' data-id='6' data-name='�з�����'> <div class='addr-name'><span>�з�����</span><span>(6)</span></div> <span class='addr-addgroup'>��Ӹ���</span> </div> <ul class='addresses-dept-list'> <li> <div class='addresses-list-item item-addr'   data-usercode='ljy' data-username='¬����' data-mail='' data-mailname=''  data-type='0'>¬����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='lc' data-username='�ֳ�' data-mail='' data-mailname=''  data-type='0'>�ֳ�</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='qm' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='hyz' data-username='������' data-mail='' data-mailname=''  data-type='0'>������</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='hr' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='cj' data-username='���' data-mail='' data-mailname=''  data-type='0'>���</div> </li></ul></li><li> <span class='addr-icon'></span> <div class='addresses-list-item addr-floder addr-group' data-id='7' data-name='�г�����'> <div class='addr-name'><span>�г�����</span><span>(6)</span></div> <span class='addr-addgroup'>��Ӹ���</span> </div> <ul class='addresses-dept-list'> <li> <div class='addresses-list-item item-addr'   data-usercode='wy' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='ly' data-username='��Ӧ' data-mail='' data-mailname=''  data-type='0'>��Ӧ</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='zt' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='lzs' data-username='³����' data-mail='' data-mailname=''  data-type='0'>³����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='ws' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='dp' data-username='��ƽ' data-mail='' data-mailname=''  data-type='0'>��ƽ</div> </li></ul></li><li> <span class='addr-icon'></span> <div class='addresses-list-item addr-floder addr-group' data-id='8' data-name='���Բ���'> <div class='addr-name'><span>���Բ���</span><span>(4)</span></div> <span class='addr-addgroup'>��Ӹ���</span> </div> <ul class='addresses-dept-list'> <li> <div class='addresses-list-item item-addr'   data-usercode='gss' data-username='����ʤ' data-mail='' data-mailname=''  data-type='0'>����ʤ</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='xn' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='sc' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='dz' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li></ul></li><li> <span class='addr-icon'></span> <div class='addresses-list-item addr-floder addr-group' data-id='9' data-name='���²���'> <div class='addr-name'><span>���²���</span><span>(4)</span></div> <span class='addr-addgroup'>��Ӹ���</span> </div> <ul class='addresses-dept-list'> <li> <div class='addresses-list-item item-addr'   data-usercode='gs' data-username='��ʤ' data-mail='' data-mailname=''  data-type='0'>��ʤ</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='zq' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='yz' data-username='��־' data-mail='' data-mailname=''  data-type='0'>��־</div> </li> <li> <div class='addresses-list-item item-addr'   data-usercode='zl' data-username='����' data-mail='' data-mailname=''  data-type='0'>����</div> </li></ul></li></ul></div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="mail-recvinfo mail-main">
                <div class="mail-toolbar">
                    <div class="tool tool_goback" data-id="0" onclick="goback()">
                        <span>�� ��</span>
                    </div>
                    <div class="tool tool_reply">
                        <span>�� ��</span>
                    </div>
                    <div class="tool tool_replyall">
                        <span>�ظ�ȫ��</span>
                    </div>
                    <div class="tool tool_retransmission">
                        <span>ת ��</span>
                    </div>
                    <div class="tool tool_deldetal">
                        <span>ɾ ��</span>
                    </div>
                    <div class="tool-right">
                        <div id="mailrecv_pre" data-type="0" class="tool mailrecv-pre" data-id="" data-mailid="" data-isread="" title="" ><span>��һ��</span></div>
                        <div id="mailrecv_next" data-type="0" class="tool mailrecv-next" data-id="" data-mailid="" data-isread="" title="" ><span>��һ��</span></div>
                    </div>
                </div>
                <div class="mail-recvinfo-details">
                    <input type="hidden" id="curRecvID" />
                    <input type="hidden" id="curRecvMailID" />
                    <div class="recvinfo-mailtitle mailinfo-title"></div>
                    <div class="recvinfo-address">
                        <table >
                            <tr class="recvinfo-row recvinfo-row-sender">
                                <td class="recvaddr-title">�����ˣ�</td>
                                <td class="recvaddr-cont recvinfo-sender-addrs"></td>
                            </tr>
                            <tr class="recvinfo-row recvinfo-row-recver">
                                <td class="recvaddr-title">�ռ��ˣ�</td>
                                <td class="recvaddr-cont recvinfo-recver-addrs">
                                </td>
                            </tr>
                            <tr class="recvinfo-row recvinfo-row-copyer">
                                <td class="recvaddr-title">�����ˣ�</td>
                                <td class="recvaddr-cont recvinfo-copyer-addrs"></td>
                            </tr>
                            <tr class="recvinfo-row recvinfo-row-files">
                                <td class="recvaddr-title">�� �� ��</td>
                                <td class="recvaddr-cont recvinfo-files"></td>
                                <td id="ifrfiles" style="display: none"></td>
                            </tr>
                            <tr class="recvinfo-row recvinfo-row-date">
                                <td class="recvaddr-title">�� �� ��</td>
                                <td class="recvaddr-cont recvinfo-date"></td>
                            </tr>
                        </table>
                    </div>
                    <div class="recvinfo-txt"></div>
                </div> 
            </div>
            <div class="mail-addres mail-main">
                  <div class="mail-toolbar">

                      <div id="addres_addcontact" class="tool tool-txtcneter tool_addcontact">
                          <span class="addoptin-icon">+</span><span> �����ϵ��</span>
                      </div>
                      <div id="addres_addgroup" class="tool tool-txtcneter tool_addgroup">
                           <span class="addoptin-icon">+</span><span> ��ӷ���</span>
                      </div>
                    
                      <div id="addres_lookup" class="tool tool_lookgroup">
                          <input type="hidden" id="curlookGroupID" value="0" />
                          <input type="hidden" id="curlookGroupName" value="0" />
                          <span>����鿴</span>
                          <span class="drop-icon"></span>
                          <div class="tool-blankspace"></div>
                          <div class="tool-menu ">
                          </div>
                      </div>
                      <div id="addres_editorgroup" class="tool  tool-txtcneter tool_delgroup ">
                          <span>�༭��</span>
                      </div>
                      <div id="addres_delgroup" class="tool  tool-txtcneter tool_delgroup ">
                          <span>ɾ����</span>
                      </div>
                  
                      <div id="addres_delcontact" class="tool  tool-txtcneter tool_delcontact">
                          <span>ɾ ��</span>
                      </div>
                    
                </div>
                <div class="mail-datas">
                    <div class="row-header">
                        <div class="row-first">
                            <input type="checkbox" class="mails-check mails-check-header" />
                            <span>�� ��</span>
                        </div>
                        <div class="row-midd">
                            <div class="row-header-col">�ʼ���ַ</div>
                            <div class="row-header-col">���ڷ���</div>
                        </div>
                        <div class="row-last">
                        </div>
                    </div>
                    <div class="contact-rows">
                     
                    </div>
                    <div id="contact-page" class="mails-page" data-type="1"></div>
                </div>
            </div>
            <div class="mail-draft mail-main">
                    <div class="mail-toolbar">
                    <div class="tool tool_select">
                        <input type="checkbox" class="mails-check" />
                        <span class="drop-icon"></span>
                         <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                            <div class="arrow-up arrow-up-select"></div>
                            <div data-id="1" class="tool-menu-item"><span>ȫѡ</span></div>
                            <div data-id="2" class="tool-menu-item"><span>��ѡ</span></div>
                        </div>
                    </div>
                    <div id="draft_del" class="tool tool_deldraft">
                        <span>ɾ���ݸ�</span>
                    </div>
                    <div id="draft_refresh" class="tool tool_refresh">
                        <span>ˢ ��</span>
                    </div>
                </div>
                <div class="mail-datas">
                    <div class="maildraft-rows">
               
                    </div>
                    <div id="mailsdraft-page" class="mails-page"></div>
                </div>
            </div>
            <div class="mail-recover mail-main">
                <div class="mail-toolbar">
                    <div class="tool recover_tool_select">
                        <input type="checkbox" class="mails-check" />
                        <span class="drop-icon"></span>
                        <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                            <div class="arrow-up arrow-up-select"></div>
                            <div data-id="1" class="tool-menu-item"><span>ȫѡ</span></div>
                            <div data-id="2" class="tool-menu-item"><span>��ѡ</span></div>
                            <div data-id="3" class="tool-menu-item"><span>�ռ�</span></div>
                            <div data-id="4" class="tool-menu-item"><span>����</span></div>
                        </div>
                    </div>
                    <div class="tool recover_tool_del">
                        <span>����ɾ��</span>
                    </div>
                    <div class="tool recover_tool_lookup" data-type="3">
                        <span>�� ��</span>
                        <span class="drop-icon"></span>
                        <div class="tool-blankspace"></div>
                        <div class="tool-menu ">
                            <div class="arrow-up arrow-up-lookup"></div>
                            <div data-id="1" class="tool-menu-item"><span>�����ʼ�</span></div>
                            <div data-id="2" class="tool-menu-item"><span>�����ʼ�</span></div>
                            <div data-id="3" class="tool-menu-item"><span>�����ʼ�</span></div>
                        </div>
                    </div>
                    <div class="tool recover_tool_reduced">
                        <span>�� ԭ</span>
                    </div>
                </div>
                <div class="mail-datas">
                    <div class="recover-rows">
                    </div>
                    <div id="mailsrecover-page" class="mails-page" data-type="1"></div>
                </div>
            </div>
            <div class="mail-sendin mail-main" data-type="0">
                <div class="mail-toolbar">
                    <div class="tool tool_select">
                        <input type="checkbox" class="mails-check" />
                        <span class="drop-icon"></span>
                         <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                            <div class="arrow-up arrow-up-select"></div>
                            <div data-id="1" class="tool-menu-item"><span>ȫѡ</span></div>
                            <div data-id="2" class="tool-menu-item"><span>��ѡ</span></div>
                        </div>
                    </div>
                    <div id="sendin_del" class="tool tool_del">
                        <span>ɾ ��</span>
                    </div>
                    <div id="send_mark" class="tool tool_mark">
                        <span>�� ��</span>
                        <span class="drop-icon"></span>
                        <div class="tool-blankspace"></div>
                        <div class="tool-menu ">
                            <div class="arrow-up arrow-up-mark"></div>
                            <div data-id="6" class="tool-menu-item"><span>����Ǳ�</span></div>
                            <div data-id="7" class="tool-menu-item"><span>ȡ���Ǳ�</span></div>
                        </div>
                    </div>
                    <div  id="sendin_move" class="tool tool_move">
                        <span>�� ��</span>
                        <span class="drop-icon"></span>
                        <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                        <div class="arrow-up arrow-up-move"></div>
                        <div class="list-floders"></div>
                        </div>
                    </div>
                    <div id="sendin_refresh" class="tool tool_refresh">
                        <span>ˢ ��</span>
                    </div>
                </div>
                <div class="mail-datas">
                    <div class="mailsendin-rows">
                        
                    </div>
                    <div id="mailssendin-page" class="mails-page"></div>
                </div>
            </div>
            <div class="mail-sendinfo mail-main">
                  <div class="mail-toolbar">
                    <div class="tool tool_goback" data-id="0" onclick="goback()">
                        <span>�� ��</span>
                    </div>
                    <div class="tool tool_sendagain">
                        <span>�ٴα༭����</span>
                    </div>
                    <div class="tool tool_delsendinfo">
                        <span>ɾ ��</span>
                    </div>
                    <div class="tool-right">
                        <div id="mailsend_pre" data-type="0" class="tool mailrecv-pre" data-id="" data-mailid="" data-isread="" title="" ><span>��һ��</span></div>
                        <div id="mailsend_next" data-type="0" class="tool mailrecv-next" data-id="" data-mailid="" data-isread="" title="" ><span>��һ��</span></div>
                    </div>
                </div>
                <div class="mail-recvinfo-details">
                    <input type="hidden" id="curSendID" />
                    <input type="hidden" id="curSendMailID" />
                    <div class="sendinfo-mailtitle mailinfo-title"></div>
                    <div class="sendinfo-address">
                        <table >
                            <tr class="recvinfo-row sendinfo-row-sender">
                                <td class="recvaddr-title">�����ˣ�</td>
                                <td class="recvaddr-cont sendinfo-sender-addrs"></td>
                            </tr>
                            <tr class="recvinfo-row sendinfo-row-recver">
                                <td class="recvaddr-title">�ռ��ˣ�</td>
                                <td class="recvaddr-cont sendinfo-recver-addrs">
                                </td>
                            </tr>
                            <tr class="recvinfo-row sendinfo-row-copyer">
                                <td class="recvaddr-title">�����ˣ�</td>
                                <td class="recvaddr-cont sendinfo-copyer-addrs"></td>
                            </tr>
                            <tr class="recvinfo-row sendinfo-row-bccer">
                                <td class="recvaddr-title">�����ˣ�</td>
                                <td class="recvaddr-cont sendinfo-bccer-addrs"></td>
                            </tr>
                            <tr class="recvinfo-row sendinfo-row-files">
                                <td class="recvaddr-title">�� �� ��</td>
                                <td class="recvaddr-cont sendinfo-files"></td>
                            </tr>
                            <tr class="recvinfo-row sendinfo-row-date">
                                <td class="recvaddr-title">�� �� ��</td>
                                <td class="recvaddr-cont sendinfo-date">2015-01-10 12:24</td>
                            </tr>
                        </table>
                    </div>
                    <div class="sendinfo-txt mailinfo-txt"></div>
                </div> 
            </div>
            <div class="mail-searchinfo mail-main">
      
                <div class="search-title">
                    <span><strong>�������</strong></span>
                    <span>���ѵ�<span id="searchNum">0</span>��ؼ���Ϊ"<span id="searchWord"></span>"���ʼ�</span>
                </div>
                <div class="mail-datas mail-search-datas">
                    <div class="search-rows">
                    </div>
                    <div id="mailssearch-page" class="mails-page" ></div>
                </div>
            </div>
            <div class="mail-recvout mail-main">
                 <div class="mail-toolbar">
                    <div class="tool tool_select">
                        <input type="checkbox" class="mails-check" />
                        <span class="drop-icon"></span>
                         <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                            <div class="arrow-up arrow-up-select"></div>
                            <div data-id="1" class="tool-menu-item"><span>ȫѡ</span></div>
                            <div data-id="2" class="tool-menu-item"><span>��ѡ</span></div>
                            <div data-id="3" class="tool-menu-item"><span>�Ѷ�</span></div>
                            <div data-id="4" class="tool-menu-item"><span>δ��</span></div>
                        </div>
                    </div>
                    <div id="recvout_del" class="tool tool_del">
                        <span>ɾ ��</span>
                    </div>
                     <div id="recvout_mark" class="tool tool_mark">
                         <span>�� ��</span>
                         <span class="drop-icon"></span>
                         <div class="tool-blankspace"></div>
                         <div class="tool-menu ">
                             <div class="arrow-up arrow-up-mark"></div>
                             <div data-id="1" class="tool-menu-item"><span>�Ѷ�</span></div>
                             
                             <div data-id="3" class="tool-menu-item"><span>ȫ����Ϊ�Ѷ�</span></div>
                             <div class="menu-divided"></div>
                             <div data-id="4" class="tool-menu-item"><span>�ö��ʼ�</span></div>
                             <div data-id="5" class="tool-menu-item"><span>ȡ���ö�</span></div>
                             <div class="menu-divided"></div>
                             <div data-id="6" class="tool-menu-item"><span>����Ǳ�</span></div>
                             <div data-id="7" class="tool-menu-item"><span>ȡ���Ǳ�</span></div>
                         </div>
                     </div>
                     <div  id="recvout_move" class="tool tool_move">
                        <span>�� ��</span>
                        <span class="drop-icon"></span>
                        <div class="tool-blankspace"></div>
                        <div class="tool-menu">
                        <div class="arrow-up arrow-up-move"></div>
                         <div class="list-floders"></div>
                        </div>
                    </div>
                    <div id="recvout_refresh" class="tool tool_refresh">
                        <span>ˢ ��</span>
                    </div>
                    <div id="recvout_flag" class="recvout-flag"></div>
                   
                </div>
                <div class="mail-datas">
                    <div class="recvout-rows">
                      
                    </div>
                    <div id="mailsrecvout-page" class="mails-page" ></div>
                </div>
            </div>
            <div class="mail-recvoutinfo mail-main">
                <div class="mail-toolbar">
                    <div class="tool tool_goback" data-id="0" onclick="goback()">
                        <span>�� ��</span>
                    </div>
                    <div class="tool tool_replyout">
                        <span>�� ��</span>
                    </div>
                    <div class="tool tool_replyallout">
                        <span>�ظ�ȫ��</span>
                    </div>
                    <div class="tool tool_retransmissionout">
                        <span>ת ��</span>
                    </div>
                    <div class="tool tool_deldetalout">
                        <span>ɾ ��</span>
                    </div>
                    <div class="tool-right">
                        <div id="mailrecvout_pre" data-type="0" class="tool mailrecv-pre" data-id="" data-mailid="" data-isread="" title="" ><span>��һ��</span></div>
                        <div id="mailrecvout_next" data-type="0" class="tool mailrecv-next" data-id="" data-mailid="" data-isread="" title="" ><span>��һ��</span></div>
                    </div>
                </div>
                <div class="mail-recvinfo-details">
                    <input type="hidden" id="curRecvOutID" />
                    <input type="hidden" id="curRecvOutMailID" />
                    <div class="recvoutinfo-mailtitle mailinfo-title"></div>
                    <div class="recvinfo-address">
                        <table >
                            <tr class="recvinfo-row recvoutinfo-row-sender">
                                <td class="recvaddr-title">�����ˣ�</td>
                                <td class="recvaddr-cont recvoutinfo-sender-addrs"></td>
                            </tr>
                            <tr class="recvinfo-row recvoutinfo-row-recver">
                                <td class="recvaddr-title">�ռ��ˣ�</td>
                                <td class="recvaddr-cont recvoutinfo-recver-addrs">
                                </td>
                            </tr>
                            <tr class="recvinfo-row recvoutinfo-row-copyer">
                                <td class="recvaddr-title">�����ˣ�</td>
                                <td class="recvaddr-cont recvoutinfo-copyer-addrs"></td>
                            </tr>
                            <tr class="recvinfo-row recvoutinfo-row-files">
                                <td class="recvaddr-title">�� �� ��</td>
                                <td class="recvaddr-cont recvoutinfo-files"></td>
                               
                            </tr>
                            <tr class="recvinfo-row recvoutinfo-row-date">
                                <td class="recvaddr-title">�� �� ��</td>
                                <td class="recvaddr-cont recvoutinfo-date"></td>
                            </tr>
                        </table>
                    </div>
                    <div class="recvoutinfo-txt"></div>
                </div> 
            </div>
            
            <div class="mail-set mail-main">
               <table cellpadding="0" cellspacing="0">
                   <tr class="write-input-row input-themetxt" id="trAccount">
                       <td class="input-title ">�ⲿ�����˺ţ�</td>
                       <td class="input-content td-email-address">
                           <div class="send-theme">
                               <input name="emailAddress" type="text" id="emailAddress" autocomplete="off" class="input-setting" placeholder="�磺email@qq.com" />
                           </div>
                           <div class="tip-email">
                               <div class="tip-title">��ѡ��������������</div>
                               <div class="email" data-mail-ext="qq.com" data-popserver="pop.qq.com" data-smtpserver="smtp.qq.com" data-usessl="true"></div>
                               <div class="email" data-mail-ext="163.com"  data-popserver="pop.163.com" data-smtpserver="smtp.163.com"></div>
                               <div class="email" data-mail-ext="126.com" data-popserver="pop.126.com" data-smtpserver="smtp.126.com"></div>
                               <div class="email" data-mail-ext="sina.com"  data-popserver="pop.sina.com" data-smtpserver="smtp.sina.com"></div>
                               <div class="email" data-mail-ext="sina.cn"  data-popserver="pop.sina.cn" data-smtpserver="smtp.sina.cn"></div>
                               <div class="email" data-mail-ext="sohu.com"  data-popserver="pop3.sohu.com" data-smtpserver="smtp.sohu.com"></div>
                               <div class="email" data-mail-ext="139.com"   data-popserver="pop.139.com" data-smtpserver="smtp.139.com"></div>
                               <div class="email" data-mail-ext="189.cn"   data-popserver="pop.189.cn" data-smtpserver="smtp.189.cn"></div>
                                <div class="email" data-mail-ext="aliyun.com"  data-popserver="pop3.aliyun.com" data-smtpserver="smtp.aliyun.com"></div>
                               <div class="email" data-mail-ext="gmail.com"   data-popserver="pop.gmail.com" data-smtpserver="smtp.gmail.com"></div>
                           </div>
                       </td>
                   </tr>
                    <tr class="write-input-row input-themetxt">
                       <td class="input-title ">�ⲿ�������룺</td>
                       <td class="input-content " >
                           <div class="send-theme">
                             
                               <input name="emailPassword" type="password" id="emailPassword" class="input-setting" />
                           </div>
                       </td>
                   </tr>
                   <tr class="write-input-row">
                       <td colspan="2"><span id="more-setting">�߼�����</span></td>
                   </tr>
                     <tr class="write-input-row input-themetxt high-setting">
                       <td class="input-title ">�����ʼ�������(POP)��</td>
                       <td class="input-content " >
                           <div class="send-theme">
                               <input name="popServer" type="text" id="popServer" placeholder="�磺pop.qq.com" class="input-setting" />
                           </div>
                       </td>
                   </tr>
                     <tr class="write-input-row input-themetxt high-setting">
                       <td class="input-title ">�˿ڣ�</td>
                       <td class="input-content " >
                           <div class="send-theme">
                               <input name="popPort" type="text" id="popPort" class="input-setting" maxlength="5" />
                           </div>
                       </td>
                   </tr>
                     <tr class="write-input-row input-themetxt high-setting">
                       <td class="input-title ">�����ʼ�����ʹ��SSL��</td>
                       <td class="input-content " colspan="2">
                           <div class="send-theme">
                                 <input value="1" name="pop-ssl" type="radio" id="popSsl1" data-value="995" />
                               <label for="popSsl1" >��</label>
                               <input value="0" name="pop-ssl" type="radio" id="popSsl0" checked="checked" data-value="110" />
                               <label for="popSsl0">��</label>                              
                           </div>
                       </td>
                   </tr>
                     <tr class="write-input-row input-themetxt high-setting">
                       <td class="input-title ">�����ʼ�������(SMTP)��</td>
                       <td class="input-content " >
                           <div class="send-theme">
                               <input name="smtpServer" type="text" id="smtpServer" placeholder="�磺smtp.qq.com" class="input-setting" />
                           </div>
                       </td>
                   </tr>
                     <tr class="write-input-row input-themetxt high-setting">
                       <td class="input-title ">�˿ڣ�</td>
                       <td class="input-content " >
                           <div class="send-theme">
                               <input name="smtpPort" type="text" id="smtpPort" class="input-setting" maxlength="5" />
                           </div>
                       </td>
                   </tr>
                     <tr class="write-input-row input-themetxt high-setting">
                       <td class="input-title ">�����ʼ�����ʹ��SSL��</td>
                       <td class="input-content " >
                           <div class="send-theme">
                               <input value="1" name="smtp-ssl" type="radio" id="smtpSsl1" data-value="465" />
                               <label for="smtpSsl1">��</label>
                               <input value="0" name="smtp-ssl" type="radio" id="smtpSsl0" checked="checked" data-value="25" />
                               <label for="smtpSsl0">��</label>
                           </div>
                       </td>
                   </tr>
                    <tr class="write-input-row input-themetxt high-setting">
                       <td class="input-title ">������ʾ���ƣ�</td>
                       <td class="input-content " >
                           <div class="send-theme">
                               <input name="senderName" type="text" id="senderName" class="input-setting" />
                           </div>
                       </td>
                   </tr>
                   <tr class="write-input-row write-btn-row"> 
                       <td></td>
                       <td >
                           <input type="button" class="write-tooll delete-mail"  id="delte-email" value="ɾ������" />
                           <input type="button" class="write-tooll"  id="save-email-setting" value="�� ��" />
                       </td>
                   </tr>
               </table>
            </div>
        </div>
        <input type="hidden" name="hfAdd" id="hfAdd" value="1" />
    </form>
</body>
</html>
