window.onload = function(){
    // 查看IE版本
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf('trident') > 0) {
        var arr = agent.split(';');
        var v;
        for(var n = 0; n < arr.length; n ++){
            if(arr[n].indexOf('msie') != -1){
                v = arr[n].split('e')[1]
            }
        }
        console.log(v)
        if(!isNaN(v)){
            parseInt(v) > 9 || $('.body').html('浏览器版本过低，请升级版本后使用').css({fontSize: '30px', color: 'red',textAlign: 'center', paddingTop: '50px'})
        }
    }

    //刷新页面 :是刷新子窗口里面的页面
    $(".load").click(function(){
        //获取iframe里面的子窗口对象contentWindow
        $("iframe")[0].contentWindow.location.reload(true);
    })
    
    // 导航数据
    var data = [
        {
            name: '首页',
            icon: 'iconxitong1',
            id: 0,
            url: './test.html'
        },
        {
            name: '导航1',
            icon: 'iconxitong1',
            id: 1,
            children: [
                {
                    name: '导航1-1',
                    icon: 'iconxitong1',
                    id: 11,
                    url: './nav1-1.html'
                },
                {
                    name: '导航1-2',
                    icon: 'iconxitong1',
                    id: 11,
                    children: [
                        {
                            name: '导航1-2-1',
                            id: 111,
                            url: './nav1-2-1.html'
                        },
                        {
                            name: '导航1-2-2',
                            id: 112,
                            url: './nav1-2-2.html'
                        }
                    ]
                },
                {
                    name: '导航1-3',
                    icon: 'iconxitong1',
                    id: 11,
                    children: [
                        {
                            name: '导航1-3-1',
                            id: 111,
                            url: './nav1-3-1.html'
                        },
                        {
                            name: '导航1-3-2',
                            id: 112,
                            url: './nav1-3-2.html'
                        }
                    ]
                }
            ]
        },
        {
            name: '导航2',
            icon: 'iconxitong1',
            id: 2,
            children: [
                {
                    name: '导航2-1',
                    icon: 'iconxitong1',
                    id: 21,
                    url: './nav2-1.html'
                }
            ]
        },
        {
            name: '导航3',
            icon: 'iconxitong1',
            id: 3,
            children: [
                {
                    name: '导航3-1',
                    icon: 'iconxitong1',
                    id: 31,
                    url: './nav3-1.html'
                },
                {
                    name: '导航3-2',
                    icon: 'iconxitong1',
                    id: 31,
                    url: './nav3-2.html'
                }
            ]
        },
        {
            name: '导航4',
            icon: 'iconxitong1',
            id: 4,
            children: [
                {
                    name: '导航4-1',
                    icon: 'iconxitong1',
                    id: 41,
                    url: './nav4-1.html'
                }
            ]
        },
    ];
    // console.log(sessionStorage.getItem('url'))
    // let url = sessionStorage.getItem('url') || './test.html'
    // $('iframe').attr('src',url)

    var len1 = data.length;
    for(var i = 0; i < len1; i ++){
        var item1 = data[i];
        var li1 = $('<li url=' + item1.url + '><i class="iconfont ' + item1.icon + '"></i><span>' + item1.name +'</span></li>');
        $('.nav1').append(li1)
    }

    // 展开与收缩侧边栏
    $('.openAndclose i').click(function(){
        // 判断是否是收缩图标
        if($(this).hasClass('iconweibiaoti26')){
            $(this).removeClass('iconweibiaoti26').addClass('iconweibiaoti25')
            $('aside').css({width:'50px'})
            $('aside .nav1 span').css({fontSize:0})
            $('.nav2').css({left:'50px'})
            if($('.nav2').hasClass('show')){
                $('main').css({marginLeft: '190px', width: 'calc(100% - 190px)'})
                
            }else{
                $('main').css({marginLeft:'50px', width: 'calc(100% - 50px)'})
            }
        }else{
            $(this).removeClass('iconweibiaoti25').addClass('iconweibiaoti26')
            $('aside').css({width:'140px'})
            $('aside .nav1 span').css({fontSize:'12px'})
            $('.nav2').css({left:'140px'})
            if($('.nav2').hasClass('show')){
                $('main').css({marginLeft:'280px', width: 'calc(100% - 280px)'})
            }else{
                $('main').css({marginLeft:'140px', width: 'calc(100% - 140px)'})
            }
        }

        
    })

    // 点击侧边栏导航
    $('.nav1 li').click(function(){
        $('.nav2').html('')
        $('.Breadcrumb').html('')
        var tapText = $(this).children('span').text();
        var span = $('<span class="first">' + tapText + '</span>')
        $('.Breadcrumb').append(span)
        
        $(this).css({background:'#394655', borderLeft: '4px solid #1d74b2'}).siblings().css({background:'#223142', borderLeft: '4px solid transparent'})
        if(tapText == '首页'){
            if($('.openAndclose i').hasClass('iconweibiaoti26')){
                $('.nav2').css({width: '0', left:'140px',fontSize:'12px'})
                $('main').css({marginLeft:'140px', width: 'calc(100% - 140px)'})
            }else{
                $('.nav2').css({width: '0', left:'50px',fontSize:'12px'})
                $('main').css({marginLeft:'50px', width: 'calc(100% - 50px)'})
            }
            $('.nav2').removeClass('show')
        }else{
            if($('.openAndclose i').hasClass('iconweibiaoti26')){
                $('.nav2').css({width: '140px', left:'140px',fontSize:'12px'})
                $('main').css({marginLeft:'280px', width: 'calc(100% - 280px)'})
            }else{
                $('.nav2').css({width: '140px', left:'50px',fontSize:'12px'})
                $('main').css({marginLeft:'190px', width: 'calc(100% - 190px)'})
            }
            $('.nav2').addClass('show')
        }
        
        var len2 = data.length;
        var tapData;
        for(var i = 0; i < len2; i ++){
            if(data[i].name == tapText){
                tapData = data[i];
            }
        }

        var firstLi = $('<li url="' + tapData.url + '"><div class="title"><span>' + tapData.name + '</span><i class="iconfont iconfanhui"></i></div></li>')
        $('.nav2').append(firstLi)

        if($(this).attr('url') != 'undefined'){
            // sessionStorage.setItem('url',$(this).attr('url'))
            $('iframe').attr('src',$(this).attr('url'))
        }
        if(!tapData.children) return ;

        var len3 = tapData.children.length;
        for(var t = 0; t < len3; t ++){
            var li2,
                item2 = tapData.children[t];
            if(item2.children){
                li2 = $('<li url="' + item2.url + '"><div class="title tap2"><p><i class="iconfont ' + item2.icon + '"></i><span>' + item2.name + '</span></p><i class="iconfont iconxsj"></i></div><ul class="nav3"></ul></li>')
                for(var j = 0; j < item2.children.length; j ++){
                    var list1 = item2.children[j];
                    var cli = $('<li url="' + list1.url + '">' + list1.name + '</li>')
                    li2.children('ul').append(cli)
                }
            }else{
                li2 = $('<li url="' + item2.url+ '"><div class="title tap2"><p><i class="iconfont ' + item2.icon + '"></i><span>' + item2.name + '</span></p><li>')
            }
            $('.nav2').append(li2)
        }

        
    })

    // 点击二级导航头部返回按钮
    $('.nav2').on('click','.iconfanhui',function(){
        $('.nav2').removeClass('show')
        if($('.openAndclose i').hasClass('iconweibiaoti26')){
            $('.nav2').css({width: '0', left:'140px'})
            $('main').css({marginLeft:'140px', width: 'calc(100% - 140px)'})
        }else{
            $('.nav2').css({width: '0', left:'50px'})
            $('main').css({marginLeft:'50px', width: 'calc(100% - 50px)'})
        }
    })

    // 点击二级导航显示或隐藏三级导航
    $('.nav2').on('click','.tap2',function(){
        console.log(this)
        $('.Breadcrumb').children('.second').remove()
        $('.Breadcrumb').children('.three').remove()
        var span = $('<span class="second"> >' + $(this).find('span').text() + '</span>')
        $('.Breadcrumb').append(span)
        if($(this).children('i').hasClass('iconxsj')){
            $(this).children('i').addClass('iconssj-copy').removeClass('iconxsj')
            $(this).next().slideDown()
            $(this).parent().siblings().children('.nav3').slideUp()
            $(this).parent().siblings().css({background: ''})
            $(this).parent().siblings().children('.tap2').find('i').addClass('iconxsj').removeClass('iconssj-copy')
        }else{
            $(this).children('i').addClass('iconxsj').removeClass('iconssj-copy')
            $(this).next().slideUp()
            $(this).parent().siblings().children('.nav3').slideUp()
            $(this).parent().siblings().children('.tap2').find('i').addClass('iconxsj').removeClass('iconssj-copy')
        }
        console.log($(this).parent().attr('url'))
        if($(this).parent().attr('url') != 'undefined'){
            // sessionStorage.setItem('url',$(this).parent().attr('url'))
            $(this).parent().css({background:'#51a0d9'})
            $(this).parent().siblings().css({background: ''})
            $(this).parent().siblings().find('li').css({background: ''})
            $('iframe').attr('src',$(this).parent().attr('url'))
        }else{
            $(this).parent().css({background:'#57626e'})
        }
    })

    // 点击三级导航
    $('.nav2').on('click','.nav3 li',function(){
        $('.Breadcrumb').children('.three').remove()
        var span = $('<span class="three"> >' + $(this).text() + '</span>')
        $('.Breadcrumb').append(span)
        if($(this).attr('url') != 'undefined'){
            // sessionStorage.setItem('url',$(this).attr('url'))
            $(this).css({background:'#51a0d9'}).siblings().css({background: ''})
            $(this).parent().parent().siblings().css({background: ''})
            $(this).parent().parent().siblings().find('li').css({background: ''})
            $('iframe').attr('src',$(this).attr('url'))
        }
    })

    // 鼠标移入一级导航显示提示内容
    $('.nav1').on('mouseover','li',function(e){
        if($('.openAndclose i').hasClass('iconweibiaoti25')){
            var hintText = $(this).children('span').text();
            $(this).attr('title',hintText)
        }else{
            $(this).removeAttr('title')
        }
    })
}