var SF={};SF.Msgbox=function(){var n,t=function(t){var i=$('<div class="dialog modal fade"><div class="modal-dialog" style="width:200px; text-align:center;"><div class="modal-content"><div class="modal-body"><\/div><\/div><\/div><\/div>');$(".modal-body",i).append(t);i.modal({backdrop:"static",keyboard:!1});i.on("hidden.bs.modal",function(){i.remove();$(".modal").css({"overflow-y":"auto"});$(".modal-open").css({overflow:"auto"})});clearTimeout(n);n=setTimeout(function(){i.modal("hide")},1500)},i=function(){t("\u64cd\u4f5c\u6210\u529f")},r=function(n,t){var i=$('<div class="dialog modal fade"><div class="modal-dialog" style="width:300px;"><div class="modal-content"><div class="modal-body" style="min-height:100px;height:auto;overflow:hidden;"><\/div><div class="modal-footer"><button type="button" class="btn btn-default btn-sm" data-dismiss="modal"><span class="glyphicon glyphicon-ok"><\/span> \u786e&nbsp;&nbsp;&nbsp;&nbsp;\u5b9a<\/button><\/div><\/div><\/div><\/div>');$(".modal-body",i).append(n.replace(/\n/g,"<br/>"));$(".modal-footer button:first",i).click(function(){t!=null&&t()});i.modal({backdrop:"static",keyboard:!1});i.on("hidden.bs.modal",function(){i.remove();$(".modal").css({"overflow-y":"auto"});$(".modal-open").css({overflow:"auto"})})},u=function(n,t){var i=$('<div class="dialog modal fade"><div class="modal-dialog" style="width:300px;"><div class="modal-content"><div class="modal-body" style="height:100px;"><\/div><div class="modal-footer"><button type="button" class="btn btn-default btn-sm" data-dismiss="modal"><span class="glyphicon glyphicon-ok"><\/span> \u786e&nbsp;&nbsp;&nbsp;&nbsp;\u5b9a<\/button><button type="button" class="btn btn-default btn-sm" data-dismiss="modal"><span class="glyphicon glyphicon-remove"><\/span> \u53d6&nbsp;&nbsp;&nbsp;&nbsp;\u6d88<\/button><\/div><\/div><\/div><\/div>');$(".modal-body",i).append(n);$(".modal-footer button:first",i).click(function(){t()});i.modal({backdrop:"static",keyboard:!1});i.on("hidden.bs.modal",function(){i.remove();$(".modal").css({"overflow-y":"auto"});$(".modal-open").css({overflow:"auto"})})};return{popup:t,succeed:i,alert:r,confirm:u}}()