
//装饰器学习   装饰器就是对类处理的一个函数
@fn
@fn2(3) //传参的时候加括号，其它时候不加
@fn3
class Myclass {
    @readonly message = 'hello'
    @noEnumerable bar = 'foo'
    @noEnumerable test() {
        console.log('hello test')
    }
    @logger //原型（实例）上的装饰器
    add(a, b) {
        return a + b
    }
}
//target 就是类本身
function fn(target) {
    target.foo = 'bar'
}
//装饰器传参
function fn2(value) {
    return function (target) {
        target.count = value;
    }
}
//装饰器 fn3为类的实例成员添加属性
function fn3(target) {
    target.prototype.name = 'name'
}

function readonly(target, name, descriptor) {
    //target 参数不再是类本身，是目标类的prototype
    console.log(target)
    console.log(name)
    console.log(descriptor);
    descriptor.writable = false // 只读
}
function noEnumerable(target, name, descriptor) {
    descriptor.enumerable = false //不能被遍历
}
//fn , fn2  相当于为类添加静态static成员
console.log('decorator fn => ', Myclass.foo)
console.log('decorator fn2传参 => ', Myclass.count)
//fn3 实例成员添加属性
console.log('decorator fn3 => ', new Myclass().name)


function logger(target, key, decriptor) {
    let oldVal = decriptor.value;
    decriptor.value = function () {
        console.log(`${key}(${Array.from(arguments).join(',')})`);
        return oldVal.apply(this, arguments)
    }
}

//装饰器另一种写法
//装饰类的原型 上的 add
//logger(Myclass.prototype,'add',Object.getOwnPropertyDescriptor(Myclass.prototype,'add'))

const c1 = new Myclass();
// console.log(c1.message)
// c1.message = 'world' readonly 不能修改
// console.log(c1.message)
console.log(c1.add)
let result = c1.add(1, 2); // function logger 打印日志  add(1,2)
console.log(result)
//静态成员不能遍历 foo count
for (let key in c1) {
    console.log(key, c1[key])
}

c1.test();