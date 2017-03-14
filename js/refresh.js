/**
 * 
 * @authors 刘念 (email:1041001122@qq.com)
 * @date    2017-03-14 15:32:31
 * @version V 0.0.1
 */
$(function(){
    // 页数
    var page = 0;
    // 每页展示10个
    var size = 10;

    // dropload
    $('.content').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新↓</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新↑</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多↑</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">没东西了</div>'
        },
        loadUpFn : function(me){
            $.ajax({
                type: 'GET',
                url: 'json/update.json',
                dataType: 'json',
                success: function(data){
                    var result = '';
                    for(var i = 0; i < data.lists.length; i++){
                        result +=   '<a class="item opacity" href="'+data.lists[i].link+'">'
                                        +'<img src="'+data.lists[i].pic+'" alt="">'
                                        +'<h3>'+data.lists[i].title+'</h3>'
                                        +'<span class="date">'+data.lists[i].date+'</span>'
                                    +'</a>';
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        $('.lists').html(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                        // 重置页数，重新获取loadDownFn的数据
                        page = 0;
                        // 解锁loadDownFn里锁定的情况
                        me.unlock();
                        me.noData(false);
                    },1000);
                },
                error: function(xhr, type){
                    alert('网络出错!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        loadDownFn : function(me){

            var result = '';
            $.ajax({
                type: 'GET',
                url: 'json/update.json',
                dataType: 'json',
                success: function(data){
                    var arrLen = data.length;
                    if(arrLen > 0){
                        for(var i=0; i<arrLen; i++){
                            result +=   '<a class="item opacity" href="'+data[i].link+'">'
                                            +'<img src="'+data[i].pic+'" alt="">'
                                            +'<h3>'+data[i].title+'</h3>'
                                            +'<span class="date">'+data[i].date+'</span>'
                                        +'</a>';
                        }
                    // 如果没有数据
                    }else{
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面，放到最后面
                        $('.lists').append(result);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('网络错误!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        threshold : 50
    });
});
