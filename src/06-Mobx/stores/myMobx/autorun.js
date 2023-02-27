import reaction from './reaction'
function autorun(handler) {
    reaction.start(handler); // 保存当前函数方法
    handler(); // a.b.c会调用get  方法
    reaction.end()
}

export default autorun