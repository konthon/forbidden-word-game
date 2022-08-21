interface IFirebaseErrorMessage {
  name: string
  title: string
  description?: string
}

const AUTH_ERRORS: IFirebaseErrorMessage[] = [
  {
    name: 'auth/email-already-in-use',
    title: 'อีเมลนี้มีอยู่ในระบบแล้ว',
    description: 'กรุณาลองเข้าสู่ระบบ',
  },
  {
    name: 'auth/popup-closed-by-user',
    title: 'คุณปิดหน้าต่างการเชื่อมต่อ',
    description: 'กรุณาลองใหม่อีกครั้ง',
  },
  {
    name: 'auth/user-not-found',
    title: 'ไม่พบอีเมลนี้ในระบบ',
    description: 'กรุณาสมัครเพื่อเปิดใช้งาน',
  },
  {
    name: 'auth/weak-password',
    title: 'รหัสผ่านคาดเดาง่าย',
    description: 'กรุณากรอกมากกว่า 6 ตัวอักษร',
  },
  {
    name: 'auth/wrong-password',
    title: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
    description: 'กรุณาตรวจสอบความถูกต้อง',
  },
]

const ERROR_MESSAGES: IFirebaseErrorMessage[] = [...AUTH_ERRORS]

export { ERROR_MESSAGES }
