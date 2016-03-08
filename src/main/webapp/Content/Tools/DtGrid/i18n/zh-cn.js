/*!
 * dtGrid v1.7.2.4
 *
 * includes: jquery, bootstrap, fontawesome
 * Copyright 2014, LiuJingCheng
 */

(function($) {
	if(!$.fn.DtGrid.lang){
		$.fn.DtGrid.lang = {};
	}
	$.fn.DtGrid.lang['zh-cn'] = {
		errors : {
			ajaxLoadError : '���ݼ���ʧ�ܣ������������������Ƿ���ڴ���'
		},
		buttons : {
			close : '<i class="fa fa-times"></i>&nbsp;&nbsp;�ر�'
		},
		extraColumn : {
			open : '<i class="fa fa-plus"></i>',
			close : '<i class="fa fa-minus"></i>'
		},
		sortColumn : {
			asc : '<i class="fa fa-sort-asc"></i>',
			desc : '<i class="fa fa-sort-desc"></i>'
		},
		toolbar : {
			refresh : '<i class="fa fa-refresh"></i>',
			refreshTitle : 'ˢ������',
			faseQuery : '<i class="fa fa-search"></i>',
			faseQueryTitle : '���ٲ�ѯ',
			advanceQuery : '<i class="fa fa-filter"></i>',
			advanceQueryTitle : '�߼���ѯ',
			exportExcel : '<i class="fa fa-file-excel-o"></i> EXCEL',
			exportExcelTitle : '����EXCEL�ļ�',
			exportCsv : '<i class="fa fa-file-o"></i> CSV',
			exportCsvTitle : '����CSV�ļ�',
			exportPdf : '<i class="fa fa-file-pdf-o"></i> PDF',
			exportPdfTitle : '����PDF�ļ�',
			exportTxt : '<i class="fa fa-file-o"></i> TXT',
			exportTxtTitle : '����TXT�ļ�',
			print : '<i class="fa fa-print"></i>',
			printTitle : '��ӡ'
		},
		pageInfo : {
			nothing : '�޲�ѯ��¼...',
			info : '��ѯ�� {recordCount} ����¼��ÿҳ {pageSize} ������  {pageCount} ҳ',
			firstPage : '<i class="fa fa-angle-double-left"></i>',
			prevPage : '<i class="fa fa-angle-left"></i>',
			nextPage : '<i class="fa fa-angle-right"></i>',
			lastPage : '<i class="fa fa-angle-double-right"></i>',
			firstPageTitle : '��һҳ',
			prevPageTitle : '��һҳ',
			nextPageTitle : '��һҳ',
			lastPageTitle : '���һҳ',
			alreadyFirstPage : '�Ѿ��ǵ�һҳ��',
			alreadyLastPage : '�Ѿ������һҳ��',
			nowPage : '{nowPage}',
			nowPageTitle : '�� {nowPage} ҳ',
			errors : {
				notANumber : '����������ݲ�������',
				maxPageSize : 'ÿҳ��ʾ�������ó��� {pageSizeLimit} �����ѻ�ԭΪԭ����'
			}
		},
		fastQuery : {
			title : '<i class="fa fa-search"></i>&nbsp;&nbsp;���ٲ�ѯ',
			codeTableSelectAll : 'ȫ��',
			input : '������',
			selectStart : '��ѡ��ʼ',
			selectEnd : '��ѡ�����',
			inputStart : '�����뿪ʼ',
			inputEnd : '���������',
			buttons : {
				reset : '<i class="fa fa-reply"></i>&nbsp;&nbsp;��������',
				query : '<i class="fa fa-search"></i>&nbsp;&nbsp;ִ�в�ѯ'
			}
		},
		advanceQuery : {
			title : '<i class="fa fa-search"></i>&nbsp;&nbsp;�߼���ѯ',
			plan : {
				title : '��ѯ����',
				advanceQueryName : '�������ƣ�',
				advanceQueryNamePlaceHoder : '�����뷽������',
				remark : '��ע��',
				remarkPlaceHoder : '�����뱸ע',
				buttons : {
					addAdvanceQuery : '<i class="fa fa-plus"></i>&nbsp;&nbsp;����',
					addAdvanceQueryTitle : '�����߼���ѯ����',
					editAdvanceQuery : '<i class="fa fa-pencil"></i>&nbsp;&nbsp;�༭',
					editAdvanceQueryTitle : '�༭�߼���ѯ����',
					copyAdvanceQuery : '<i class="fa fa-copy"></i>&nbsp;&nbsp;����',
					copyAdvanceQueryTitle : '���Ƹ߼���ѯ����',
					deleteAdvanceQuery : '<i class="fa fa-trash-o"></i>&nbsp;&nbsp;ɾ��',
					deleteAdvanceQueryTitle : 'ɾ���߼���ѯ����'
				}
			},
			condition : {
				title : '��ѯ����',
				table : {
					sequence : '���',
					operation : '����',
					leftParentheses : '������',
					field : '�ֶ�',
					condition : '����',
					value : 'ֵ',
					rightParentheses : '������',
					logic : '�߼�',
					buttons : {
						up : '<i class="fa fa-arrow-circle-up"></i>',
						upTitle : '��������',
						down : '<i class="fa fa-arrow-circle-down"></i>',
						downTitle : '��������',
						'delete' : '<i class="fa fa-times"></i>',
						deleteTitle : 'ɾ������'
					}
				},
				buttons : {
					insert : '<i class="fa fa-plus"></i>&nbsp;&nbsp;����һ��',
					insertTitle : '����һ��',
					clear : '<i class="fa fa-eraser"></i>&nbsp;&nbsp;�������',
					clearTitle : '�������'
				},
				errors : {
					fieldMustSelect : '��ѯ�����е� {sequence} �е��ֶ���Ϣ����ѡ��',
					conditionMustSelect : '��ѯ�����е� {sequence} �е�������Ϣ����ѡ��',
					conditionError : '���������������ʵ����в�ѯ��'
				}
			},
			sort : {
				title : '��������',
				logic : {
					asc : '����',
					desc : '����'
				},
				table : {
					sequence : '���',
					operation : '����',
					field : '�ֶ�',
					logic : '�߼�',
					buttons : {
						up : '<i class="fa fa-arrow-circle-up"></i>',
						upTitle : '��������',
						down : '<i class="fa fa-arrow-circle-down"></i>',
						downTitle : '��������',
						'delete' : '<i class="fa fa-times"></i>',
						deleteTitle : 'ɾ������'
					}
				},
				buttons : {
					insert : '<i class="fa fa-plus"></i>&nbsp;&nbsp;����һ��',
					insertTitle : '����һ��',
					clear : '<i class="fa fa-eraser"></i>&nbsp;&nbsp;�������',
					clearTitle : '�������'
				},
				errors : {
					fieldMustSelect : '���������е� {sequence} �е��ֶ���Ϣ����ѡ��',
					logicMustSelect : '���������е� {sequence} �е������߼�����ѡ��'
				}
			},
			buttons : {
				query : '<i class="fa fa-search"></i>&nbsp;&nbsp;ִ�в�ѯ'
			}
		},
		print : {
			title : '<i class="fa fa-print"></i>&nbsp;&nbsp;��ӡѡ��',
			table : {
				column : '��',
				operation : '����',
				buttons : {
					up : '<i class="fa fa-arrow-circle-up"></i>&nbsp;&nbsp;����',
					upTitle : '����',
					down : '<i class="fa fa-arrow-circle-down"></i>&nbsp;&nbsp;����',
					downTitle : '����'
				}
			},
			buttons : {
				print : '<i class="fa fa-print"></i>&nbsp;&nbsp;ִ�д�ӡ'
			}
		},
		'export' : {
			excel : {
				title : '<i class="fa fa-download"></i>&nbsp;&nbsp;����EXCELѡ��',
				exportType : {
					title : '������ʽ��',
					now : '������ǰ����',
					all : '����ȫ������'
				},
				table : {
					column : '��',
					operation : '����',
					buttons : {
						up : '<i class="fa fa-arrow-circle-up"></i>&nbsp;&nbsp;����',
						upTitle : '����',
						down : '<i class="fa fa-arrow-circle-down"></i>&nbsp;&nbsp;����',
						downTitle : '����'
					}
				},
				buttons : {
					'export' : '<i class="fa fa-print"></i>&nbsp;&nbsp;ִ�е���EXCEL�ļ�'
				}
			},
			csv : {
				title : '<i class="fa fa-download"></i>&nbsp;&nbsp;����CSVѡ��',
				exportType : {
					title : '������ʽ��',
					now : '������ǰ����',
					all : '����ȫ������'
				},
				table : {
					column : '��',
					operation : '����',
					buttons : {
						up : '<i class="fa fa-arrow-circle-up"></i>&nbsp;&nbsp;����',
						upTitle : '����',
						down : '<i class="fa fa-arrow-circle-down"></i>&nbsp;&nbsp;����',
						downTitle : '����'
					}
				},
				buttons : {
					'export' : '<i class="fa fa-print"></i>&nbsp;&nbsp;ִ�е���CSV�ļ�'
				}
			},
			pdf : {
				title : '<i class="fa fa-download"></i>&nbsp;&nbsp;����PDFѡ��',
				exportType : {
					title : '������ʽ��',
					now : '������ǰ����',
					all : '����ȫ������'
				},
				table : {
					column : '��',
					operation : '����',
					buttons : {
						up : '<i class="fa fa-arrow-circle-up"></i>&nbsp;&nbsp;����',
						upTitle : '����',
						down : '<i class="fa fa-arrow-circle-down"></i>&nbsp;&nbsp;����',
						downTitle : '����'
					}
				},
				buttons : {
					'export' : '<i class="fa fa-print"></i>&nbsp;&nbsp;ִ�е���PDF�ļ�'
				}
			},
			txt : {
				title : '<i class="fa fa-download"></i>&nbsp;&nbsp;����TXTѡ��',
				exportType : {
					title : '������ʽ��',
					now : '������ǰ����',
					all : '����ȫ������'
				},
				table : {
					column : '��',
					operation : '����',
					buttons : {
						up : '<i class="fa fa-arrow-circle-up"></i>&nbsp;&nbsp;����',
						upTitle : '����',
						down : '<i class="fa fa-arrow-circle-down"></i>&nbsp;&nbsp;����',
						downTitle : '����'
					}
				},
				buttons : {
					'export' : '<i class="fa fa-print"></i>&nbsp;&nbsp;ִ�е���TXT�ļ�'
				}
			}
		}
	};
})(jQuery);