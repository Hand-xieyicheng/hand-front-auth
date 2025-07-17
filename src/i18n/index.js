import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    login: {
      emailLogin: 'Email Login',
      phoneLogin: 'Phone Login',
      getCode: 'Get Code',
      resend: 'Resend',
      rememberMe: 'Remember me',
      signIn: 'Sign In',
      registerNow: 'Register now',
      forgotPassword: 'Forgot password?'
    },
    validation: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      invalidCode: 'Please enter a valid verification code',
      minLength: 'Must be at least {length} characters'
    },
    common: {
      welcome: 'Welcome to our platform',
      enterpriseSolution: 'Enterprise-grade solutions for modern businesses',
      dontHaveAccount: "Don't have an account?",
      darkMode: 'Dark Mode'
    }
  },
  zh: {
    login: {
      emailLogin: '邮箱登录',
      phoneLogin: '手机号登录',
      getCode: '获取验证码',
      resend: '重新发送',
      rememberMe: '记住我',
      signIn: '登录',
      registerNow: '立即注册',
      forgotPassword: '忘记密码?'
    },
    validation: {
      required: '此字段不能为空',
      invalidEmail: '请输入有效的邮箱地址',
      invalidPhone: '请输入有效的手机号',
      invalidCode: '请输入有效的验证码',
      minLength: '至少需要{length}个字符'
    },
    common: {
      welcome: '欢迎使用我们的平台',
      enterpriseSolution: '为现代企业提供企业级解决方案',
      dontHaveAccount: '还没有账号?',
      darkMode: '暗黑模式'
    }
  },
  ja: {
    login: {
      emailLogin: 'メールログイン',
      phoneLogin: '携帯ログイン',
      getCode: 'コード取得',
      resend: '再送信',
      rememberMe: 'ログイン情報を保存',
      signIn: 'サインイン',
      registerNow: '今すぐ登録',
      forgotPassword: 'パスワードを忘れましたか?'
    },
    validation: {
      required: 'このフィールドは必須です',
      invalidEmail: '有効なメールアドレスを入力してください',
      invalidPhone: '有効な携帯番号を入力してください',
      invalidCode: '有効な検証コードを入力してください',
      minLength: '少なくとも{length}文字必要です'
    },
    common: {
      welcome: '私たちのプラットフォームへようこそ',
      enterpriseSolution: '現代的な企業向けのエンタープライズソリューション',
      dontHaveAccount: 'アカウントを持っていませんか?',
      darkMode: 'ダークモード'
    }
  }
}

const savedLanguage = localStorage.getItem('appLanguage') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages
})

export default i18n  