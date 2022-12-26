//定义装饰器
function mixins(...list){
    return function(target){
        Object.assign(target.prototype,...list)
    }
}

const Foo = {
    foo(){
        console.log('foo mixin ')
    }
}

//可以看成是利用装饰器来实现继承的方式
@mixins(Foo)
class MyClass{}

const  myclass = new MyClass();

myclass.foo()