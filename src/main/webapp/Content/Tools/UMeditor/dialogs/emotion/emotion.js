(function () {

    var editor = null;

    UM.registerWidget('emotion', {

        tpl: "<link type=\"text/css\" rel=\"stylesheet\" href=\"<%=emotion_url%>emotion.css\">" +
            "<div class=\"edui-emotion-tab-Jpanel edui-emotion-wrapper\">" +
            "<ul class=\"edui-emotion-Jtabnav edui-tab-nav\">" +
            "<li class=\"edui-tab-item\"><a data-context=\".edui-emotion-Jtab0\" hideFocus=\"true\" class=\"edui-tab-text\"><%=lang_input_choice%></a></li>" +
            "<li class=\"edui-tab-item\"><a data-context=\".edui-emotion-Jtab1\" class=\"edui-tab-text\"><%=lang_input_Tuzki%></a></li>" +
            "<li class=\"edui-tab-item\"><a data-context=\".edui-emotion-Jtab2\" hideFocus=\"true\" class=\"edui-tab-text\"><%=lang_input_lvdouwa%></a></li>" +
            "<li class=\"edui-tab-item\"><a data-context=\".edui-emotion-Jtab3\" hideFocus=\"true\" class=\"edui-tab-text\"><%=lang_input_BOBO%></a></li>" +
            "<li class=\"edui-tab-item\"><a data-context=\".edui-emotion-Jtab4\" hideFocus=\"true\" class=\"edui-tab-text\"><%=lang_input_babyCat%></a></li>" +
            "<li class=\"edui-tab-item\"><a data-context=\".edui-emotion-Jtab5\" hideFocus=\"true\" class=\"edui-tab-text\"><%=lang_input_bubble%></a></li>" +
            "<li class=\"edui-tab-item\"><a data-context=\".edui-emotion-Jtab6\" hideFocus=\"true\" class=\"edui-tab-text\"><%=lang_input_youa%></a></li>" +
            "<li class=\"edui-emotion-tabs\"></li>" +
            "</ul>" +
            "<div class=\"edui-tab-content edui-emotion-JtabBodys\">" +
            "<div class=\"edui-emotion-Jtab0 edui-tab-pane\"></div>" +
            "<div class=\"edui-emotion-Jtab1 edui-tab-pane\"></div>" +
            "<div class=\"edui-emotion-Jtab2 edui-tab-pane\"></div>" +
            "<div class=\"edui-emotion-Jtab3 edui-tab-pane\"></div>" +
            "<div class=\"edui-emotion-Jtab4 edui-tab-pane\"></div>" +
            "<div class=\"edui-emotion-Jtab5 edui-tab-pane\"></div>" +
            "<div class=\"edui-emotion-Jtab6 edui-tab-pane\"></div>" +
            "</div>" +
            "<div class=\"edui-emotion-JtabIconReview edui-emotion-preview-box\">" +
            "<img src=\"<%=cover_img%>\" class=\'edui-emotion-JfaceReview edui-emotion-preview-img\'/>" +
            "</div>",

        sourceData: {
            emotion: {
                tabNum: 7, //&#x5207;&#x6362;&#x9762;&#x677F;&#x6570;&#x91CF;
                SmilmgName: { 'edui-emotion-Jtab0': ['j_00', 84], 'edui-emotion-Jtab1': ['t_00', 40], 'edui-emotion-Jtab2': ['w_00', 52], 'edui-emotion-Jtab3': ['B_00', 63], 'edui-emotion-Jtab4': ['C_00', 20], 'edui-emotion-Jtab5': ['i_f', 50], 'edui-emotion-Jtab6': ['y_00', 40] }, //&#x56FE;&#x7247;&#x524D;&#x7F00;&#x540D;
                imageFolders: { 'edui-emotion-Jtab0': 'jx2/', 'edui-emotion-Jtab1': 'tsj/', 'edui-emotion-Jtab2': 'ldw/', 'edui-emotion-Jtab3': 'bobo/', 'edui-emotion-Jtab4': 'babycat/', 'edui-emotion-Jtab5': 'face/', 'edui-emotion-Jtab6': 'youa/' }, //&#x56FE;&#x7247;&#x5BF9;&#x5E94;&#x6587;&#x4EF6;&#x5939;&#x8DEF;&#x5F84;
                imageCss: { 'edui-emotion-Jtab0': 'jd', 'edui-emotion-Jtab1': 'tsj', 'edui-emotion-Jtab2': 'ldw', 'edui-emotion-Jtab3': 'bb', 'edui-emotion-Jtab4': 'cat', 'edui-emotion-Jtab5': 'pp', 'edui-emotion-Jtab6': 'youa' }, //&#x56FE;&#x7247;css&#x7C7B;&#x540D;
                imageCssOffset: { 'edui-emotion-Jtab0': 35, 'edui-emotion-Jtab1': 35, 'edui-emotion-Jtab2': 35, 'edui-emotion-Jtab3': 35, 'edui-emotion-Jtab4': 35, 'edui-emotion-Jtab5': 25, 'edui-emotion-Jtab6': 35 }, //&#x56FE;&#x7247;&#x504F;&#x79FB;
                SmileyInfor: {
                    'edui-emotion-Jtab0': ['Kiss', 'Love', 'Yeah', '&#x554A;&#xFF01;', '&#x80CC;&#x626D;', '&#x9876;', '&#x6296;&#x80F8;', '88', '&#x6C57;', '&#x778C;&#x7761;', '&#x9C81;&#x62C9;', '&#x62CD;&#x7816;', '&#x63C9;&#x8138;', '&#x751F;&#x65E5;&#x5FEB;&#x4E50;', '&#x5927;&#x7B11;', '&#x7011;&#x5E03;&#x6C57;~', '&#x60CA;&#x8BB6;', '&#x81ED;&#x7F8E;', '&#x50BB;&#x7B11;', '&#x629B;&#x5A9A;&#x773C;', '&#x53D1;&#x6012;', '&#x6253;&#x9171;&#x6CB9;', '&#x4FEF;&#x5367;&#x6491;', '&#x6C14;&#x6124;', '?', '&#x543B;', '&#x6012;', '&#x80DC;&#x5229;', 'HI', 'KISS', '&#x4E0D;&#x8BF4;', '&#x4E0D;&#x8981;', '&#x626F;&#x82B1;', '&#x5927;&#x5FC3;', '&#x9876;', '&#x5927;&#x60CA;', '&#x98DE;&#x543B;', '&#x9B3C;&#x8138;', '&#x5BB3;&#x7F9E;', '&#x53E3;&#x6C34;', '&#x72C2;&#x54ED;', '&#x6765;', '&#x53D1;&#x8D22;&#x4E86;', '&#x5403;&#x897F;&#x74DC;', '&#x5957;&#x7262;', '&#x5BB3;&#x7F9E;', '&#x5E86;&#x795D;', '&#x6211;&#x6765;&#x4E86;', '&#x6572;&#x6253;', '&#x6655;&#x4E86;', '&#x80DC;&#x5229;', '&#x81ED;&#x7F8E;', '&#x88AB;&#x6253;&#x4E86;', '&#x8D2A;&#x5403;', '&#x8FCE;&#x63A5;', '&#x9177;', '&#x5FAE;&#x7B11;', '&#x4EB2;&#x543B;', '&#x8C03;&#x76AE;', '&#x60CA;&#x6050;', '&#x800D;&#x9177;', '&#x53D1;&#x706B;', '&#x5BB3;&#x7F9E;', '&#x6C57;&#x6C34;', '&#x5927;&#x54ED;', '', '&#x52A0;&#x6CB9;', '&#x56F0;', '&#x4F60;NB', '&#x6655;&#x5012;', '&#x5F00;&#x5FC3;', '&#x5077;&#x7B11;', '&#x5927;&#x54ED;', '&#x6EF4;&#x6C57;', '&#x53F9;&#x6C14;', '&#x8D85;&#x8D5E;', '??', '&#x98DE;&#x543B;', '&#x5929;&#x4F7F;', '&#x6492;&#x82B1;', '&#x751F;&#x6C14;', '&#x88AB;&#x7838;', '&#x5413;&#x50BB;', '&#x968F;&#x610F;&#x5410;'],
                    'edui-emotion-Jtab1': ['Kiss', 'Love', 'Yeah', '&#x554A;&#xFF01;', '&#x80CC;&#x626D;', '&#x9876;', '&#x6296;&#x80F8;', '88', '&#x6C57;', '&#x778C;&#x7761;', '&#x9C81;&#x62C9;', '&#x62CD;&#x7816;', '&#x63C9;&#x8138;', '&#x751F;&#x65E5;&#x5FEB;&#x4E50;', '&#x644A;&#x624B;', '&#x7761;&#x89C9;', '&#x762B;&#x5750;', '&#x65E0;&#x804A;', '&#x661F;&#x661F;&#x95EA;', '&#x65CB;&#x8F6C;', '&#x4E5F;&#x4E0D;&#x884C;', '&#x90C1;&#x95F7;', '&#x6B63;Music', '&#x6293;&#x5899;', '&#x649E;&#x5899;&#x81F3;&#x6B7B;', '&#x6B6A;&#x5934;', '&#x6233;&#x773C;', '&#x98D8;&#x8FC7;', '&#x4E92;&#x76F8;&#x62CD;&#x7816;', '&#x780D;&#x6B7B;&#x4F60;', '&#x6254;&#x684C;&#x5B50;', '&#x5C11;&#x6797;&#x5BFA;', '&#x4EC0;&#x4E48;&#xFF1F;', '&#x8F6C;&#x5934;', '&#x6211;&#x7231;&#x725B;&#x5976;', '&#x6211;&#x8E22;', '&#x6447;&#x6643;', '&#x6655;&#x53A5;', '&#x5728;&#x7B3C;&#x5B50;&#x91CC;', '&#x9707;&#x8361;'],
                    'edui-emotion-Jtab2': ['&#x5927;&#x7B11;', '&#x7011;&#x5E03;&#x6C57;~', '&#x60CA;&#x8BB6;', '&#x81ED;&#x7F8E;', '&#x50BB;&#x7B11;', '&#x629B;&#x5A9A;&#x773C;', '&#x53D1;&#x6012;', '&#x6211;&#x9519;&#x4E86;', 'money', '&#x6C14;&#x6124;', '&#x6311;&#x9017;', '&#x543B;', '&#x6012;', '&#x80DC;&#x5229;', '&#x59D4;&#x5C48;', '&#x53D7;&#x4F24;', '&#x8BF4;&#x5565;&#x5462;&#xFF1F;', '&#x95ED;&#x5634;', '&#x4E0D;', '&#x9017;&#x4F60;&#x73A9;&#x513F;', '&#x98DE;&#x543B;', '&#x7729;&#x6655;', '&#x9B54;&#x6CD5;', '&#x6211;&#x6765;&#x4E86;', '&#x7761;&#x4E86;', '&#x6211;&#x6253;', '&#x95ED;&#x5634;', '&#x6253;', '&#x6253;&#x6655;&#x4E86;', '&#x5237;&#x7259;', '&#x7206;&#x63CD;', '&#x70B8;&#x5F39;', '&#x5012;&#x7ACB;', '&#x522E;&#x80E1;&#x5B50;', '&#x90AA;&#x6076;&#x7684;&#x7B11;', '&#x4E0D;&#x8981;&#x4E0D;&#x8981;', '&#x7231;&#x604B;&#x4E2D;', '&#x653E;&#x5927;&#x4ED4;&#x7EC6;&#x770B;', '&#x5077;&#x7AA5;', '&#x8D85;&#x9AD8;&#x5174;', '&#x6655;', '&#x677E;&#x53E3;&#x6C14;', '&#x6211;&#x8DD1;', '&#x4EAB;&#x53D7;', '&#x4FEE;&#x517B;', '&#x54ED;', '&#x6C57;', '&#x554A;~', '&#x70ED;&#x70C8;&#x6B22;&#x8FCE;', '&#x6253;&#x9171;&#x6CB9;', '&#x4FEF;&#x5367;&#x6491;', '?'],
                    'edui-emotion-Jtab3': ['HI', 'KISS', '&#x4E0D;&#x8BF4;', '&#x4E0D;&#x8981;', '&#x626F;&#x82B1;', '&#x5927;&#x5FC3;', '&#x9876;', '&#x5927;&#x60CA;', '&#x98DE;&#x543B;', '&#x9B3C;&#x8138;', '&#x5BB3;&#x7F9E;', '&#x53E3;&#x6C34;', '&#x72C2;&#x54ED;', '&#x6765;', '&#x6CEA;&#x773C;', '&#x6D41;&#x6CEA;', '&#x751F;&#x6C14;', '&#x5410;&#x820C;', '&#x559C;&#x6B22;', '&#x65CB;&#x8F6C;', '&#x518D;&#x89C1;', '&#x6293;&#x72C2;', '&#x6C57;', '&#x9119;&#x89C6;', '&#x62DC;', '&#x5410;&#x8840;', '&#x5618;', '&#x6253;&#x4EBA;', '&#x8E66;&#x8DF3;', '&#x53D8;&#x8138;', '&#x626F;&#x8089;', '&#x5403;To', '&#x5403;&#x82B1;', '&#x5439;&#x6CE1;&#x6CE1;&#x7CD6;', '&#x5927;&#x53D8;&#x8EAB;', '&#x98DE;&#x5929;&#x821E;', '&#x56DE;&#x7738;', '&#x53EF;&#x601C;', '&#x731B;&#x62BD;', '&#x6CE1;&#x6CE1;', '&#x82F9;&#x679C;', '&#x4EB2;', '', '&#x9A9A;&#x821E;', '&#x70E7;&#x9999;', '&#x7761;', '&#x5957;&#x5A03;&#x5A03;', '&#x6345;&#x6345;', '&#x821E;&#x5012;', '&#x897F;&#x7EA2;&#x67FF;', '&#x7231;&#x6155;', '&#x6447;', '&#x6447;&#x6446;', '&#x6742;&#x800D;', '&#x62DB;&#x8D22;', '&#x88AB;&#x6BB4;', '&#x88AB;&#x7403;&#x95F7;', '&#x5927;&#x60CA;', '&#x7406;&#x60F3;', '&#x6B27;&#x6253;', '&#x5455;&#x5410;', '&#x788E;', '&#x5410;&#x75F0;'],
                    'edui-emotion-Jtab4': ['&#x53D1;&#x8D22;&#x4E86;', '&#x5403;&#x897F;&#x74DC;', '&#x5957;&#x7262;', '&#x5BB3;&#x7F9E;', '&#x5E86;&#x795D;', '&#x6211;&#x6765;&#x4E86;', '&#x6572;&#x6253;', '&#x6655;&#x4E86;', '&#x80DC;&#x5229;', '&#x81ED;&#x7F8E;', '&#x88AB;&#x6253;&#x4E86;', '&#x8D2A;&#x5403;', '&#x8FCE;&#x63A5;', '&#x9177;', '&#x9876;', '&#x5E78;&#x8FD0;', '&#x7231;&#x5FC3;', '&#x8EB2;', '&#x9001;&#x82B1;', '&#x9009;&#x62E9;'],
                    'edui-emotion-Jtab5': ['&#x5FAE;&#x7B11;', '&#x4EB2;&#x543B;', '&#x8C03;&#x76AE;', '&#x60CA;&#x8BB6;', '&#x800D;&#x9177;', '&#x53D1;&#x706B;', '&#x5BB3;&#x7F9E;', '&#x6C57;&#x6C34;', '&#x5927;&#x54ED;', '&#x5F97;&#x610F;', '&#x9119;&#x89C6;', '&#x56F0;', '&#x5938;&#x5956;', '&#x6655;&#x5012;', '&#x7591;&#x95EE;', '&#x5A92;&#x5A46;', '&#x72C2;&#x5410;', '&#x9752;&#x86D9;', '&#x53D1;&#x6101;', '&#x4EB2;&#x543B;', '', '&#x7231;&#x5FC3;', '&#x5FC3;&#x788E;', '&#x73AB;&#x7470;', '&#x793C;&#x7269;', '&#x54ED;', '&#x5978;&#x7B11;', '&#x53EF;&#x7231;', '&#x5F97;&#x610F;', '&#x5472;&#x7259;', '&#x66B4;&#x6C57;', '&#x695A;&#x695A;&#x53EF;&#x601C;', '&#x56F0;', '&#x54ED;', '&#x751F;&#x6C14;', '&#x60CA;&#x8BB6;', '&#x53E3;&#x6C34;', '&#x5F69;&#x8679;', '&#x591C;&#x7A7A;', '&#x592A;&#x9633;', '&#x94B1;&#x94B1;', '&#x706F;&#x6CE1;', '&#x5496;&#x5561;', '&#x86CB;&#x7CD5;', '&#x97F3;&#x4E50;', '&#x7231;', '&#x80DC;&#x5229;', '&#x8D5E;', '&#x9119;&#x89C6;', 'OK'],
                    'edui-emotion-Jtab6': ['&#x7537;&#x515C;', '&#x5973;&#x515C;', '&#x5F00;&#x5FC3;', '&#x4E56;&#x4E56;', '&#x5077;&#x7B11;', '&#x5927;&#x7B11;', '&#x62BD;&#x6CE3;', '&#x5927;&#x54ED;', '&#x65E0;&#x5948;', '&#x6EF4;&#x6C57;', '&#x53F9;&#x6C14;', '&#x72C2;&#x6655;', '&#x59D4;&#x5C48;', '&#x8D85;&#x8D5E;', '??', '&#x7591;&#x95EE;', '&#x98DE;&#x543B;', '&#x5929;&#x4F7F;', '&#x6492;&#x82B1;', '&#x751F;&#x6C14;', '&#x88AB;&#x7838;', '&#x53E3;&#x6C34;', '&#x6CEA;&#x5954;', '&#x5413;&#x50BB;', '&#x5410;&#x820C;&#x5934;', '&#x70B9;&#x5934;', '&#x968F;&#x610F;&#x5410;', '&#x65CB;&#x8F6C;', '&#x56F0;&#x56F0;', '&#x9119;&#x89C6;', '&#x72C2;&#x9876;', '&#x7BEE;&#x7403;', '&#x518D;&#x89C1;', '&#x6B22;&#x8FCE;&#x5149;&#x4E34;', '&#x606D;&#x559C;&#x53D1;&#x8D22;', '&#x7A0D;&#x7B49;', '&#x6211;&#x5728;&#x7EBF;', '&#x6055;&#x4E0D;&#x8BAE;&#x4EF7;', '&#x5E93;&#x623F;&#x6709;&#x8D27;', '&#x8D27;&#x5728;&#x8DEF;&#x4E0A;']
                }
            }
        },
        initContent: function (_editor, $widget) {

            var me = this,
                emotion = me.sourceData.emotion,
                lang = _editor.getLang('emotion')['static'],
                emotionUrl = UMEDITOR_CONFIG.UMEDITOR_HOME_URL + 'dialogs/emotion/',
                options = $.extend({}, lang, {
                    emotion_url: emotionUrl
                }),
                $root = me.root();

            if (me.inited) {
                me.preventDefault();
                this.switchToFirst();
                return;
            }

            me.inited = true;

            editor = _editor;
            this.widget = $widget;

            emotion.SmileyPath = _editor.options.emotionLocalization === true ? emotionUrl + 'images/' : "http://img.baidu.com/hi/";
            emotion.SmileyBox = me.createTabList(emotion.tabNum);
            emotion.tabExist = me.createArr(emotion.tabNum);

            options['cover_img'] = emotion.SmileyPath + (editor.options.emotionLocalization ? '0.gif' : 'default/0.gif');

            $root.html($.parseTmpl(me.tpl, options));

            me.tabs = $.eduitab({ selector: ".edui-emotion-tab-Jpanel" });

            //&#x7F13;&#x5B58;&#x9884;&#x89C8;&#x5BF9;&#x8C61;
            me.previewBox = $root.find(".edui-emotion-JtabIconReview");
            me.previewImg = $root.find(".edui-emotion-JfaceReview");

            me.initImgName();

        },
        initEvent: function () {

            var me = this;

            //&#x9632;&#x6B62;&#x70B9;&#x51FB;&#x8FC7;&#x540E;&#x5173;&#x95ED;popup
            me.root().on('click', function (e) {
                return false;
            });

            //&#x79FB;&#x52A8;&#x9884;&#x89C8;
            me.root().delegate('td', 'mouseover mouseout', function (evt) {

                var $td = $(this),
                    url = $td.attr('data-surl') || null;

                if (url) {
                    me[evt.type](this, url, $td.attr('data-posflag'));
                }

                return false;

            });

            //&#x70B9;&#x51FB;&#x9009;&#x4E2D;
            me.root().delegate('td', 'click', function (evt) {

                var $td = $(this),
                    realUrl = $td.attr('data-realurl') || null;

                if (realUrl) {
                    me.insertSmiley(realUrl.replace(/'/g, "\\'"), evt);
                }

                return false;

            });

            //&#x66F4;&#x65B0;&#x6A21;&#x677F;
            me.tabs.edui().on("beforeshow", function (evt) {

                var contentId = $(evt.target).attr('data-context').replace(/^.*\.(?=[^\s]*$)/, '');

                evt.stopPropagation();

                me.updateTab(contentId);

            });

            this.switchToFirst();

        },
        initImgName: function () {

            var emotion = this.sourceData.emotion;

            for (var pro in emotion.SmilmgName) {
                var tempName = emotion.SmilmgName[pro],
                    tempBox = emotion.SmileyBox[pro],
                    tempStr = "";

                if (tempBox.length) return;

                for (var i = 1; i <= tempName[1]; i++) {
                    tempStr = tempName[0];
                    if (i < 10) tempStr = tempStr + '0';
                    tempStr = tempStr + i + '.gif';
                    tempBox.push(tempStr);
                }
            }

        },
        /**
         * &#x5207;&#x6362;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;tab
         */
        switchToFirst: function () {
            this.root().find(".edui-emotion-Jtabnav .edui-tab-text:first").trigger('click');
        },
        updateTab: function (contentBoxId) {

            var me = this,
                emotion = me.sourceData.emotion;

            me.autoHeight(contentBoxId);

            if (!emotion.tabExist[contentBoxId]) {

                emotion.tabExist[contentBoxId] = true;
                me.createTab(contentBoxId);

            }

        },
        autoHeight: function () {
            this.widget.height(this.root() + 2);
        },
        createTabList: function (tabNum) {
            var obj = {};
            for (var i = 0; i < tabNum; i++) {
                obj["edui-emotion-Jtab" + i] = [];
            }
            return obj;
        },
        mouseover: function (td, srcPath, posFlag) {

            posFlag -= 0;

            $(td).css('backgroundColor', '#ACCD3C');

            this.previewImg.css("backgroundImage", "url(" + srcPath + ")");
            posFlag && this.previewBox.addClass('edui-emotion-preview-left');
            this.previewBox.show();

        },
        mouseout: function (td) {
            $(td).css('backgroundColor', 'transparent');
            this.previewBox.removeClass('edui-emotion-preview-left').hide();
        },
        insertSmiley: function (url, evt) {
            var obj = {
                src: url
            };
            obj._src = obj.src;
            editor.execCommand('insertimage', obj);
            if (!evt.ctrlKey) {
                //&#x5173;&#x95ED;&#x9884;&#x89C8;
                this.previewBox.removeClass('edui-emotion-preview-left').hide();
                this.widget.edui().hide();
            }
        },
        createTab: function (contentBoxId) {

            var faceVersion = "?v=1.1", //&#x7248;&#x672C;&#x53F7;
                me = this,
                $contentBox = this.root().find("." + contentBoxId),
                emotion = me.sourceData.emotion,
                imagePath = emotion.SmileyPath + emotion.imageFolders[contentBoxId], //&#x83B7;&#x53D6;&#x663E;&#x793A;&#x8868;&#x60C5;&#x548C;&#x9884;&#x89C8;&#x8868;&#x60C5;&#x7684;&#x8DEF;&#x5F84;
                positionLine = 11 / 2, //&#x4E2D;&#x95F4;&#x6570;
                iWidth = iHeight = 35, //&#x56FE;&#x7247;&#x957F;&#x5BBD;
                iColWidth = 3, //&#x8868;&#x683C;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x7684;&#x663E;&#x793A;&#x6BD4;&#x4F8B;
                tableCss = emotion.imageCss[contentBoxId],
                cssOffset = emotion.imageCssOffset[contentBoxId],
                textHTML = ['<table border="1" class="edui-emotion-smileytable">'],
                i = 0, imgNum = emotion.SmileyBox[contentBoxId].length, imgColNum = 11, faceImage,
                sUrl, realUrl, posflag, offset, infor;

            for (; i < imgNum;) {
                textHTML.push('<tr>');
                for (var j = 0; j < imgColNum; j++, i++) {
                    faceImage = emotion.SmileyBox[contentBoxId][i];
                    if (faceImage) {
                        sUrl = imagePath + faceImage + faceVersion;
                        realUrl = imagePath + faceImage;
                        posflag = j < positionLine ? 0 : 1;
                        offset = cssOffset * i * (-1) - 1;
                        infor = emotion.SmileyInfor[contentBoxId][i];

                        textHTML.push('<td  class="edui-emotion-' + tableCss + '" data-surl="' + sUrl + '" data-realurl="' + realUrl + '" data-posflag="' + posflag + '" align="center">');
                        textHTML.push('<span>');
                        textHTML.push('<img  style="background-position:left ' + offset + 'px;" title="' + infor + '" src="' + emotion.SmileyPath + (editor.options.emotionLocalization ? '0.gif" width="' : 'default/0.gif" width="') + iWidth + '" height="' + iHeight + '"></img>');
                        textHTML.push('</span>');
                    } else {
                        textHTML.push('<td bgcolor="#FFFFFF">');
                    }
                    textHTML.push('</td>');
                }
                textHTML.push('</tr>');
            }
            textHTML.push('</table>');
            textHTML = textHTML.join("");
            $contentBox.html(textHTML);
        },
        createArr: function (tabNum) {
            var arr = [];
            for (var i = 0; i < tabNum; i++) {
                arr[i] = 0;
            }
            return arr;
        },
        width: 603,
        height: 400
    });

})();
