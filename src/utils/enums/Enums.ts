export enum pathNameEnum {
  CATALOG = "/catalog",
  CART = "/cart",
  CONFIGURATION = "/configuration",
  HOME = "/home",
  PROFILE = "/profile",
  MY_COURSES = "/my-courses",
  SEND_REQUEST = "/send-request",
}

export enum adminPathNameEnum {
  ADMIN_USERS = "/admin/users",
}

export enum teacherPathNameEnum {
  TEACHER_DASHBOARD = "/teacher/dashboard",
}

export enum roleEnum {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

export enum queryKeysEnum {
  GET_CATEGORIES = "CATEGORIES",
  GET_CATEGORIES_BY_ID = "CATEGORIES_BY_ID",
  GET_COURSES = "COURSES",
  GET_COURSE_BY_ID = "COURSE_BY_ID",
  GET_COURSES_BY_CATEGORY = "COURSES_BY_CATEGORY",
  GET_COURSES_BY_INSTRUCTOR = "COURSES_BY_INSTRUCTOR",
  GET_LESSONS = "LESSONS",
  GET_LESSON_BY_ID = "LESSON_BY_ID",
  GET_LESSONS_BY_MODULE_ID = "LESSONS_BY_MODULE_ID",
  GET_MODULE_BY_ID = "MODULE_BY_ID",
  CREATE_USER = "CREATE_USER",
  GET_USERS = "GET_USERS",
  GET_USER_BY_ID = "GET_USER_BY_ID",
}
