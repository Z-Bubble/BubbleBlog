//页面第一次请求 默认 1页  10条
function dataLists(pageNum, numPerPage) {
    $.post(Url + 'pipei_dj/pagelist', {
        pageNum: pageNum, // 页码数
        numPerPage: numPerPage // 每页条数
    }, function (data) {
        let datalist = JSON.parse(data)
        dataList(datalist)  // 数据传到 table组件
        page(datalist)      // 数据传到 分页组件
    })
}
dataLists(1, 10)

function page(data) {
    laypage.render({
        elem: 'page', //注意，这里的 page 是 ID，不用加 # 号
        count: data.totalCount, //数据总数，从服务端得到
        limit: data.numPerPage,  // 每页条数
        limits: [10, 20, 30, 40, 50],
        layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
        jump: function (obj, first) {
            //console.log(obj)
            //obj包含了当前分页的所有参数，比如：
            //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            //console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if (!first) {
                //do something
                numpage(obj.curr, obj.limit)  // 分页点击传参 
            }
        }
    });
}
// 从新写了 一个请求
function numpage(pageNum, numPerPage) {
    $.post(Url + 'pipei_dj/pagelist', {
        pageNum: pageNum,
        numPerPage: numPerPage
    }, function (data) {
        let datalist = JSON.parse(data)
        dataList(datalist)  // 传到table组件
    })
}

// 表格渲染
function dataList(data) {
    table.render({
        elem: '#test',
        cols: [
            [{
                title: '序号',
                type: "numbers"
            }, {
                field: 'id',
                title: 'id',
                hide: true
            }, {
                field: 'status',
                title: '状态',
                hide: true
            }, {
                field: 'danjia',
                title: '单价(￥)'
            }, {
                field: 'createtime',
                title: '创建时间'
            }, {
                field: 'status',
                title: '状态',
                toolbar: '#barstate'
            }, {
                title: '操作',
                toolbar: '#barDemo'
            }]
        ],
        data: data.dataList, // 数据
        limit: data.numPerPage, // 显示的条数
        //page: true, // 开启分页
    });
}