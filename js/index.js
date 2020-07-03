window.onload = function(){
    //刷新页面 :是刷新子窗口里面的页面
    $(".load").click(function(){
        //获取iframe里面的子窗口对象contentWindow
        $("iframe")[0].contentWindow.location.reload(true);
    })
    
    // 导航数据
    let data = [
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
    ]
    console.log(sessionStorage.getItem('url'))
    let url = sessionStorage.getItem('url') || './test.html'
    $('iframe').attr('src',url)
    data.forEach(item => {
        let li = $(`<li url="${item.url}">
                        <i class="iconfont ${item.icon}"></i>
                        <span>${item.name}</span>
                    </li>`);
        $('.nav1').append(li)
    })

    // 展开与收缩侧边栏
    $('.openAndclose i').click(function(){
        // 判断是否是收缩图标
        if($(this).hasClass('iconweibiaoti26')){
            $(this).removeClass('iconweibiaoti26').addClass('iconweibiaoti25')
            $('aside').css({width:'50px'})
            $('aside .nav1 span').css({fontSize:0})
            $('.nav2').css({left:'50px'})
            if($('.nav2').hasClass('show')){
                $('main').css({marginLeft:'190px'})
            }else{
                $('main').css({marginLeft:'50px'})
            }
        }else{
            $(this).removeClass('iconweibiaoti25').addClass('iconweibiaoti26')
            $('aside').css({width:'140px'})
            $('aside .nav1 span').css({fontSize:'12px'})
            $('.nav2').css({left:'140px'})
            if($('.nav2').hasClass('show')){
                $('main').css({marginLeft:'280px'})
            }else{
                $('main').css({marginLeft:'140px'})
            }
        }

        
    })

    // 点击侧边栏导航
    $('.nav1 li').click(function(){
        $('.nav2').html('')
        $('.Breadcrumb').html('')
        let tapText = $(this).children('span').text();
        let span = $(`<span class="first">${tapText}</span>`)
        $('.Breadcrumb').append(span)
        
        $(this).css({background:'#394655', borderLeft: '4px solid #1d74b2'}).siblings().css({background:'#223142', borderLeft: '4px solid transparent'})
        if(tapText == '首页'){
            if($('.openAndclose i').hasClass('iconweibiaoti26')){
                $('.nav2').css({width: '0', left:'140px',fontSize:'12px'})
                $('main').css({marginLeft:'140px'})
            }else{
                $('.nav2').css({width: '0', left:'50px',fontSize:'12px'})
                $('main').css({marginLeft:'50px'})
            }
            $('.nav2').removeClass('show')
        }else{
            if($('.openAndclose i').hasClass('iconweibiaoti26')){
                $('.nav2').css({width: '140px', left:'140px',fontSize:'12px'})
                $('main').css({marginLeft:'280px'})
            }else{
                $('.nav2').css({width: '140px', left:'50px',fontSize:'12px'})
                $('main').css({marginLeft:'190px'})
            }
            $('.nav2').addClass('show')
        }
        
        let tapData = data.find(item => {
            return item.name == tapText;
        })
        let firstLi = $(`<li url="${tapData.url}">
                            <div class="title">
                                <span>${tapData.name}</span>
                                <i class="iconfont iconfanhui"></i>
                            </div>
                        </li>`)
        $('.nav2').append(firstLi)
        if($(this).attr('url') != 'undefined'){
            // sessionStorage.setItem('url',$(this).attr('url'))
            $('iframe').attr('src',$(this).attr('url'))
        }
        if(!tapData.children) return ;
        tapData.children.forEach(item => {
            let li;
            if(item.children){
                li = $(`<li url="${item.url}">
                            <div class="title tap2">
                                <span>${item.name}</span>
                                <i class="iconfont iconxsj"></i>
                            </div>
                            <ul class="nav3">
                            </ul>
                        </li>`)
                item.children.forEach(list => {
                    let cli = $(`<li url="${list.url}">${list.name}</li>`)
                    li.children('ul').append(cli)
                })
            }else{
                li = $(`<li url="${item.url}">
                            <div class="title tap2">
                                <span>${item.name}</span>
                            </div>
                        <li>`)
            }
            $('.nav2').append(li)
        })

        
        
    })

    // 点击二级导航头部返回按钮
    $('.nav2').on('click','.iconfanhui',function(){
        $('.nav2').removeClass('show')
        if($('.openAndclose i').hasClass('iconweibiaoti26')){
            $('.nav2').css({width: '0', left:'140px'})
            $('main').css({marginLeft:'140px'})
        }else{
            $('.nav2').css({width: '0', left:'50px'})
            $('main').css({marginLeft:'50px'})
        }
    })

    // 点击二级导航显示或隐藏三级导航
    $('.nav2').on('click','.tap2',function(){
        console.log(this)
        $('.Breadcrumb').children('.second').remove()
        $('.Breadcrumb').children('.three').remove()
        let span = $(`<span class="second"> > ${$(this).children('span').text()}</span>`)
        $('.Breadcrumb').append(span)
        if($(this).children('i').hasClass('iconxsj')){
            $(this).children('i').addClass('iconssj-copy').removeClass('iconxsj')
            $(this).next().css({display:'block'})
            $(this).parent().siblings().children('.nav3').css({display:'none'})
            $(this).parent().siblings().css({background: ''})
            $(this).parent().siblings().children('.tap2').find('i').addClass('iconxsj').removeClass('iconssj-copy')
        }else{
            $(this).children('i').addClass('iconxsj').removeClass('iconssj-copy')
            $(this).next().css({display:'none'})
            $(this).parent().siblings().children('.nav3').css({display:'none'})
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
        let span = $(`<span class="three"> > ${$(this).text()}</span>`)
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
            let hintText = $(this).children('span').text();
            $(this).attr('title',hintText)
        }else{
            $(this).removeAttr('title')
        }
    })
}