// https://juejin.cn/post/7085674288933502984
// 多层级路由组装
const [Login, PageCenter, Page1, Page2, Page3, Page4, Page5, Page3_1, Page5_1, Page5_1_1, Page5_1_2, Page5_1_2_1] = 
['Login', 'PageCenter', 'Page1', 'Page2', 'Page3', 'Page4', 'Page5', 'Page3_1', 'Page5_1', 'Page5_1_1', 'Page5_1_2', 'Page5_1_2_1']
//扁平化配置带来的好处
//最直观的好处就是，调整路由组件的组织关系变得简单。

// const r_loginRoute = Symbol(),
//   r_pageCenter = Symbol(),
//   r_page1 = Symbol(),
//   r_page2 = Symbol(),
//   r_page3 = Symbol(),
//   r_page4 = Symbol(),
//   r_page5 = Symbol(),
//   r_page3_1 = Symbol(),
//   r_page5_1 = Symbol(),
//   r_page5_1_1 = Symbol(),
//   r_page5_1_2 = Symbol(),
//   r_page5_1_2_1 = Symbol();
const r_loginRoute = "r_loginRoute",
    r_pageCenter = "r_pageCenter",
    r_page1 = "r_page1",
    r_page2 = "r_page2",
    r_page3 = "r_page3",
    r_page4 = "r_page4",
    r_page5 = "r_page5",
    r_page3_1 = "r_page3_1",
    r_page5_1 = "r_page5_1",
    r_page5_1_1 = "r_page5_1_1",
    r_page5_1_2 = "r_page5_1_2",
    r_page5_1_2_1 = "r_page5_1_2_1";
//r_loginRoute routesMap ,relation  这三个变量是相关联的
let routesMap = {
    [r_loginRoute]: {
        path: '/',
        element: Login
    },
    [r_pageCenter]: {
        path: '/pageCenter',
        element: PageCenter
    },
    [r_page1]: {
        path: '/page1',
        element: Page1
    },
    [r_page2]: {
        path: '/page2',
        element: Page2
    },
    [r_page3]: {
        path: '/page3',
        element: Page3
    },
    [r_page4]: {
        path: '/page4',
        element: Page4
    },
    [r_page5]: {
        path: '/page5',
        element: Page5
    },
    [r_page3_1]: {
        path: '/page3_1',
        element: Page3_1
    },
    [r_page5_1]: {
        path: '/page5_1',
        element: Page5_1
    },
    [r_page5_1_1]: {
        path: '/page5_1_1',
        element: Page5_1_1
    },
    [r_page5_1_2]: {
        path: '/page5_1_2',
        element: Page5_1_2
    },
    [r_page5_1_2_1]: {
        path: '/page5_1_2_1',
        element: Page5_1_2_1
    }
}

let relation = [{
        id: r_loginRoute,
        parentId: ''
    },
    {
        id: r_pageCenter,
        parentId: ''
    },
    {
        id: r_page1,
        parentId: r_pageCenter
    },

    {
        id: r_page2,
        parentId: r_pageCenter
    },
    {
        id: r_page3,
        parentId: r_pageCenter
    },
    {
        id: r_page4,
        parentId: r_pageCenter
    },
    {
        id: r_page5,
        parentId: r_pageCenter
    },
    {
        id: r_page3_1,
        parentId: r_page3
    },
    {
        id: r_page5_1,
        parentId: r_page5
    },
    {
        id: r_page5_1_1,
        parentId: r_page5_1
    },
    {
        id: r_page5_1_2,
        parentId: r_page5_1
    },
    {
        id: r_page5_1_2_1,
        parentId: r_page5_1_2
    },
]

const createRoutesData = ({ relation, routesMap }) => {
    // 首先遍历一下“组织关系”数据，作用：
    // 1 深拷贝一下“组织关系”数据，不污染和篡改原数据。
    // 2 记录一下索引，优化效率。
    let relationCopy = []; // 结构和relation一样
    let ids = {} // {r_loginRoute:0,r_pageCenter:1,...}
    relation.forEach((item, index) => {
        const { id } = item
        ids[id] = index
        relationCopy.push({ ...item })
    })

    
    const wrapper = (i) => i;
    // 加工RouteItem
    const processRouteItem = data => {
        let temp = { ...data }
        temp.element = wrapper(temp.element)
        return temp
    }

    // 工具函数，简化逻辑，让代码清晰。
    // 初始化数据
    // routesData, 'children', []
    //obj =  {id: 'r_page1', parentId: 'r_pageCenter', path: '/page1', element: 3}
    const initData = (obj, key = 'children', def = []) => {
        if (!(key in obj)) {
            obj[key] = def
        }
        return obj[key]
    }

    // 目标结果数据
    let results = []
    // 然后遍历一下数据，融合
    relationCopy.forEach(item => {
        const { id, parentId } = item; // {id: r_loginRoute,parentId: ''}
        //{[r_page5_1_2_1]: {path: '/page5_1_2_1',element: Page5_1_2_1}}
        // routesMap[id]返回{path: '/page5_1_2_1',element: Page5_1_2_1}
        Object.assign(item, processRouteItem(routesMap[id]))
        //item: {id: 'r_page1', parentId: 'r_pageCenter', path: '/page1', element: 3}
        
        //我添加的code start 
        //检查路由的组件和路径是否对应；自定规则对比，一般用不上
        const { path, element } = item;
        if (path !== '/' && (path.toLowerCase() !== `/${element.toLowerCase()}`)) {
            console.error(item, 'error');
            // return; forEach 退不出循环
        }
        //我添加的code end
        if (!parentId) {
            if (!(id in routesMap)) {
                throw `routesMap未配置该id:${id}的数据个体`
            }
            results.push(item);
        } else {
            let pIndex = ids[parentId] //pIndex number?
            let routesData = relationCopy[pIndex]
            let routeChildren = initData(routesData, 'children', []);
            // console.log(results); //这个算法不错

            routeChildren.push(item) // 利用了引用类型的特点，直接修改了这个引用类型中的某一部分结构
        }
    })
    return results
}

const routeList = createRoutesData({
    relation,
    routesMap
});
console.dir(routeList);
