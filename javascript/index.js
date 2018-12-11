$(function() {
    // 初始化 定义变量
    var action, sign_in_tab, register_tab, sign_in_form, register_form, is_law_accepted
    var initData = function() {
        sign_in_tab = $('#sign-in-tab')
        register_tab = $('#register-tab')
        sign_in_form = $('#sign-in-form')
        register_form = $('#register-form')
        is_law_accepted = false
    }
    // 初始化页面
    var initView = function() {
        //调用路由选择函数，根据hash 找到对应的路由页面，进行显示
        hashRouterRender()
    }
    var hashRouterRender = function() {
        //获取页面的hash值
        action = window.location.hash.substring(1)
        //根据点击事件  action 判断
        switch (action) {
            default :
                sign_in_tab.addClass('router-link-exact-active')
                register_tab.removeClass('router-link-exact-active')
                //显示隐藏表单 默认为登录
                sign_in_form.show()
                register_form.hide()
                break;
            case 'register':
                register_tab.addClass('router-link-exact-active')
                sign_in_tab.removeClass('router-link-exact-active')
                sign_in_form.hide()
                register_form.show()
                break            
        }
    }
    // 登录判断函数
    var signIn = function() {
        var nickname = sign_in_form.find('input[name="nickname"]').val()
        var password = sign_in_form.find('input[name="password"]').val()
        var validatate = function() {
            if (!nickname) {
                return {
                    is_valid: false,
                    invalid_msg: '输入登录昵称'
                }
            }
            if (!password) {
                return {
                    is_valid: false,
                    invalid_msg: '请输入登录密码'
                }
            }
            return {
                is_valid: true
            }
        }
        let validation_info = validatate()
        if (!validation_info.is_valid) {
            window.alert(validation_info.invalid_msg)
        } else {
            console.log('sign_in success.')
        }
    }
    //前端验证代码实例
    var check_nickname_exists = function() {
        var nickname = register_form.find('input[name="nickname"]').val()
        if (nickname && nickname == 'aaa') {
            register_form.find('.errmsg').show()
        } else {
            register_form.find('.errmsg').hide()
        }
    }
    //点击阅读  事件  取反操作
    var toggleLawAccept = function() {
        register_form.find('#is_law_accepted').toggleClass('active')
        is_law_accepted = !is_law_accepted
    }
    //注册判断函数
    var register = function() {
        var nickname = register_form.find('input[name="nickname"]').val()
        var password = register_form.find('input[name="password"]').val()
        var validatate = function() {
            if (!nickname) {
                return {
                    is_valid: false,
                    invalid_msg: '请输入您的昵称'
                }
            }
            if (!password) {
                return {
                    is_valid: false,
                    invalid_msg: '请输入您的初始密码'
                }
            }
            if (!is_law_accepted) {
                return {
                    is_valid: false,
                    invalid_msg: '请先阅读并接受《会员协议》'
                }
            }
            return {
                is_valid: true
            }
        }
        let validation_info = validatate()
        if (!validation_info.is_valid) {
            window.alert(validation_info.invalid_msg)
        } else {
            console.log('register success.')
        }
    }
    //初始化事件
    var initEvent = function() {
        window.onhashchange = hashRouterRender
        sign_in_form.submit(function(e) {
            e.preventDefault()
            signIn()
        })
        register_form.find('input[name="nickname"]').on('input', check_nickname_exists)
        register_form.find('#is_law_accepted').on('click', toggleLawAccept)
        register_form.submit(function(e) {
            e.preventDefault()
            register()
        })
    }
    // 初始化  执行顺序
    initData()
    initView()
    initEvent()
})