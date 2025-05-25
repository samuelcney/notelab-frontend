export enum pathNameEnum {
  CATALOG = "/dashboard/catalog",
  CART = "/dashboard/cart",
  CONFIGURATION = "/dashboard/configuration",
  HOME = "/dashboard/home",
  PROFILE = "/dashboard/profile",
  MY_COURSES = "/dashboard/my-courses",
  SEND_REQUEST = "/dashboard/send-request",
}

export enum adminPathNameEnum {
  ADMIN_USERS = "/admin/users",
}

export enum instructorPathNameEnum {
  INSTRUCTOR_DASHBOARD = "/instructor/dashboard",
}

export enum roleEnum {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

export enum QueryKeysEnum {
  GET_CATEGORIES = "CATEGORIES",
  GET_CATEGORIES_BY_ID = "CATEGORIES_BY_ID",

  GET_COURSES = "COURSES",
  GET_COURSE_BY_ID = "COURSE_BY_ID",
  GET_COURSES_BY_CATEGORY = "COURSES_BY_CATEGORY",
  GET_COURSES_BY_INSTRUCTOR = "COURSES_BY_INSTRUCTOR",
  CREATE_COURSE = "CREATE_COURSE",

  GET_LESSONS = "LESSONS",
  GET_LESSON_BY_ID = "LESSON_BY_ID",
  GET_LESSONS_BY_MODULE_ID = "LESSONS_BY_MODULE_ID",
  GET_MODULE_BY_ID = "MODULE_BY_ID",

  GET_USERS = "GET_USERS",
  GET_USER_BY_ID = "GET_USER_BY_ID",
  CURRENT_USER = "CURRENT_USER",
  UPDATE_PROFILE = "UPDATE_PROFILE",

  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  LOGOUT = "LOG_OUT",
}

export enum courseLevelEnum {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum lessonTypeEnum {
  VIDEO_URL = "VIDEO_URL",
  VIDEO = "VIDEO",
}
