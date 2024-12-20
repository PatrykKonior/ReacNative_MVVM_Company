/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/advanced` | `/advanced`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/explore` | `/explore`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/tools` | `/tools`; params?: Router.UnknownInputParams; } | { pathname: `/clients/addClient`; params?: Router.UnknownInputParams; } | { pathname: `/clients`; params?: Router.UnknownInputParams; } | { pathname: `/clients/styles`; params?: Router.UnknownInputParams; } | { pathname: `/clients/viewAllClients`; params?: Router.UnknownInputParams; } | { pathname: `/dashboard`; params?: Router.UnknownInputParams; } | { pathname: `/departments/addDepartment`; params?: Router.UnknownInputParams; } | { pathname: `/departments`; params?: Router.UnknownInputParams; } | { pathname: `/departments/styles`; params?: Router.UnknownInputParams; } | { pathname: `/departments/viewAllDepartments`; params?: Router.UnknownInputParams; } | { pathname: `/employees/addEmployee`; params?: Router.UnknownInputParams; } | { pathname: `/employees`; params?: Router.UnknownInputParams; } | { pathname: `/employees/styles`; params?: Router.UnknownInputParams; } | { pathname: `/employees/viewAllEmployees`; params?: Router.UnknownInputParams; } | { pathname: `/invoices/addInvoice`; params?: Router.UnknownInputParams; } | { pathname: `/invoices`; params?: Router.UnknownInputParams; } | { pathname: `/invoices/styles`; params?: Router.UnknownInputParams; } | { pathname: `/invoices/viewAllInvoices`; params?: Router.UnknownInputParams; } | { pathname: `/materials/addMaterial`; params?: Router.UnknownInputParams; } | { pathname: `/materials`; params?: Router.UnknownInputParams; } | { pathname: `/materials/styles`; params?: Router.UnknownInputParams; } | { pathname: `/materials/viewAllMaterials`; params?: Router.UnknownInputParams; } | { pathname: `/payments/addpayments`; params?: Router.UnknownInputParams; } | { pathname: `/payments`; params?: Router.UnknownInputParams; } | { pathname: `/payments/viewallpayments`; params?: Router.UnknownInputParams; } | { pathname: `/projects/addproject`; params?: Router.UnknownInputParams; } | { pathname: `/projects`; params?: Router.UnknownInputParams; } | { pathname: `/projects/styles`; params?: Router.UnknownInputParams; } | { pathname: `/projects/viewallprojects`; params?: Router.UnknownInputParams; } | { pathname: `/sale/addsale`; params?: Router.UnknownInputParams; } | { pathname: `/sale`; params?: Router.UnknownInputParams; } | { pathname: `/sale/viewallsales`; params?: Router.UnknownInputParams; } | { pathname: `/settings`; params?: Router.UnknownInputParams; } | { pathname: `/settings/styles`; params?: Router.UnknownInputParams; } | { pathname: `/Tasks/addTask`; params?: Router.UnknownInputParams; } | { pathname: `/Tasks`; params?: Router.UnknownInputParams; } | { pathname: `/Tasks/styles`; params?: Router.UnknownInputParams; } | { pathname: `/Tasks/viewAllTasks`; params?: Router.UnknownInputParams; } | { pathname: `/timeLogs/addTimeLog`; params?: Router.UnknownInputParams; } | { pathname: `/timeLogs`; params?: Router.UnknownInputParams; } | { pathname: `/timeLogs/styles`; params?: Router.UnknownInputParams; } | { pathname: `/timeLogs/viewAllTimeLogs`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/advanced` | `/advanced`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/explore` | `/explore`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/tools` | `/tools`; params?: Router.UnknownOutputParams; } | { pathname: `/clients/addClient`; params?: Router.UnknownOutputParams; } | { pathname: `/clients`; params?: Router.UnknownOutputParams; } | { pathname: `/clients/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/clients/viewAllClients`; params?: Router.UnknownOutputParams; } | { pathname: `/dashboard`; params?: Router.UnknownOutputParams; } | { pathname: `/departments/addDepartment`; params?: Router.UnknownOutputParams; } | { pathname: `/departments`; params?: Router.UnknownOutputParams; } | { pathname: `/departments/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/departments/viewAllDepartments`; params?: Router.UnknownOutputParams; } | { pathname: `/employees/addEmployee`; params?: Router.UnknownOutputParams; } | { pathname: `/employees`; params?: Router.UnknownOutputParams; } | { pathname: `/employees/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/employees/viewAllEmployees`; params?: Router.UnknownOutputParams; } | { pathname: `/invoices/addInvoice`; params?: Router.UnknownOutputParams; } | { pathname: `/invoices`; params?: Router.UnknownOutputParams; } | { pathname: `/invoices/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/invoices/viewAllInvoices`; params?: Router.UnknownOutputParams; } | { pathname: `/materials/addMaterial`; params?: Router.UnknownOutputParams; } | { pathname: `/materials`; params?: Router.UnknownOutputParams; } | { pathname: `/materials/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/materials/viewAllMaterials`; params?: Router.UnknownOutputParams; } | { pathname: `/payments/addpayments`; params?: Router.UnknownOutputParams; } | { pathname: `/payments`; params?: Router.UnknownOutputParams; } | { pathname: `/payments/viewallpayments`; params?: Router.UnknownOutputParams; } | { pathname: `/projects/addproject`; params?: Router.UnknownOutputParams; } | { pathname: `/projects`; params?: Router.UnknownOutputParams; } | { pathname: `/projects/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/projects/viewallprojects`; params?: Router.UnknownOutputParams; } | { pathname: `/sale/addsale`; params?: Router.UnknownOutputParams; } | { pathname: `/sale`; params?: Router.UnknownOutputParams; } | { pathname: `/sale/viewallsales`; params?: Router.UnknownOutputParams; } | { pathname: `/settings`; params?: Router.UnknownOutputParams; } | { pathname: `/settings/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/Tasks/addTask`; params?: Router.UnknownOutputParams; } | { pathname: `/Tasks`; params?: Router.UnknownOutputParams; } | { pathname: `/Tasks/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/Tasks/viewAllTasks`; params?: Router.UnknownOutputParams; } | { pathname: `/timeLogs/addTimeLog`; params?: Router.UnknownOutputParams; } | { pathname: `/timeLogs`; params?: Router.UnknownOutputParams; } | { pathname: `/timeLogs/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/timeLogs/viewAllTimeLogs`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/advanced${`?${string}` | `#${string}` | ''}` | `/advanced${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/explore${`?${string}` | `#${string}` | ''}` | `/explore${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/tools${`?${string}` | `#${string}` | ''}` | `/tools${`?${string}` | `#${string}` | ''}` | `/clients/addClient${`?${string}` | `#${string}` | ''}` | `/clients${`?${string}` | `#${string}` | ''}` | `/clients/styles${`?${string}` | `#${string}` | ''}` | `/clients/viewAllClients${`?${string}` | `#${string}` | ''}` | `/dashboard${`?${string}` | `#${string}` | ''}` | `/departments/addDepartment${`?${string}` | `#${string}` | ''}` | `/departments${`?${string}` | `#${string}` | ''}` | `/departments/styles${`?${string}` | `#${string}` | ''}` | `/departments/viewAllDepartments${`?${string}` | `#${string}` | ''}` | `/employees/addEmployee${`?${string}` | `#${string}` | ''}` | `/employees${`?${string}` | `#${string}` | ''}` | `/employees/styles${`?${string}` | `#${string}` | ''}` | `/employees/viewAllEmployees${`?${string}` | `#${string}` | ''}` | `/invoices/addInvoice${`?${string}` | `#${string}` | ''}` | `/invoices${`?${string}` | `#${string}` | ''}` | `/invoices/styles${`?${string}` | `#${string}` | ''}` | `/invoices/viewAllInvoices${`?${string}` | `#${string}` | ''}` | `/materials/addMaterial${`?${string}` | `#${string}` | ''}` | `/materials${`?${string}` | `#${string}` | ''}` | `/materials/styles${`?${string}` | `#${string}` | ''}` | `/materials/viewAllMaterials${`?${string}` | `#${string}` | ''}` | `/payments/addpayments${`?${string}` | `#${string}` | ''}` | `/payments${`?${string}` | `#${string}` | ''}` | `/payments/viewallpayments${`?${string}` | `#${string}` | ''}` | `/projects/addproject${`?${string}` | `#${string}` | ''}` | `/projects${`?${string}` | `#${string}` | ''}` | `/projects/styles${`?${string}` | `#${string}` | ''}` | `/projects/viewallprojects${`?${string}` | `#${string}` | ''}` | `/sale/addsale${`?${string}` | `#${string}` | ''}` | `/sale${`?${string}` | `#${string}` | ''}` | `/sale/viewallsales${`?${string}` | `#${string}` | ''}` | `/settings${`?${string}` | `#${string}` | ''}` | `/settings/styles${`?${string}` | `#${string}` | ''}` | `/Tasks/addTask${`?${string}` | `#${string}` | ''}` | `/Tasks${`?${string}` | `#${string}` | ''}` | `/Tasks/styles${`?${string}` | `#${string}` | ''}` | `/Tasks/viewAllTasks${`?${string}` | `#${string}` | ''}` | `/timeLogs/addTimeLog${`?${string}` | `#${string}` | ''}` | `/timeLogs${`?${string}` | `#${string}` | ''}` | `/timeLogs/styles${`?${string}` | `#${string}` | ''}` | `/timeLogs/viewAllTimeLogs${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/advanced` | `/advanced`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/explore` | `/explore`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/tools` | `/tools`; params?: Router.UnknownInputParams; } | { pathname: `/clients/addClient`; params?: Router.UnknownInputParams; } | { pathname: `/clients`; params?: Router.UnknownInputParams; } | { pathname: `/clients/styles`; params?: Router.UnknownInputParams; } | { pathname: `/clients/viewAllClients`; params?: Router.UnknownInputParams; } | { pathname: `/dashboard`; params?: Router.UnknownInputParams; } | { pathname: `/departments/addDepartment`; params?: Router.UnknownInputParams; } | { pathname: `/departments`; params?: Router.UnknownInputParams; } | { pathname: `/departments/styles`; params?: Router.UnknownInputParams; } | { pathname: `/departments/viewAllDepartments`; params?: Router.UnknownInputParams; } | { pathname: `/employees/addEmployee`; params?: Router.UnknownInputParams; } | { pathname: `/employees`; params?: Router.UnknownInputParams; } | { pathname: `/employees/styles`; params?: Router.UnknownInputParams; } | { pathname: `/employees/viewAllEmployees`; params?: Router.UnknownInputParams; } | { pathname: `/invoices/addInvoice`; params?: Router.UnknownInputParams; } | { pathname: `/invoices`; params?: Router.UnknownInputParams; } | { pathname: `/invoices/styles`; params?: Router.UnknownInputParams; } | { pathname: `/invoices/viewAllInvoices`; params?: Router.UnknownInputParams; } | { pathname: `/materials/addMaterial`; params?: Router.UnknownInputParams; } | { pathname: `/materials`; params?: Router.UnknownInputParams; } | { pathname: `/materials/styles`; params?: Router.UnknownInputParams; } | { pathname: `/materials/viewAllMaterials`; params?: Router.UnknownInputParams; } | { pathname: `/payments/addpayments`; params?: Router.UnknownInputParams; } | { pathname: `/payments`; params?: Router.UnknownInputParams; } | { pathname: `/payments/viewallpayments`; params?: Router.UnknownInputParams; } | { pathname: `/projects/addproject`; params?: Router.UnknownInputParams; } | { pathname: `/projects`; params?: Router.UnknownInputParams; } | { pathname: `/projects/styles`; params?: Router.UnknownInputParams; } | { pathname: `/projects/viewallprojects`; params?: Router.UnknownInputParams; } | { pathname: `/sale/addsale`; params?: Router.UnknownInputParams; } | { pathname: `/sale`; params?: Router.UnknownInputParams; } | { pathname: `/sale/viewallsales`; params?: Router.UnknownInputParams; } | { pathname: `/settings`; params?: Router.UnknownInputParams; } | { pathname: `/settings/styles`; params?: Router.UnknownInputParams; } | { pathname: `/Tasks/addTask`; params?: Router.UnknownInputParams; } | { pathname: `/Tasks`; params?: Router.UnknownInputParams; } | { pathname: `/Tasks/styles`; params?: Router.UnknownInputParams; } | { pathname: `/Tasks/viewAllTasks`; params?: Router.UnknownInputParams; } | { pathname: `/timeLogs/addTimeLog`; params?: Router.UnknownInputParams; } | { pathname: `/timeLogs`; params?: Router.UnknownInputParams; } | { pathname: `/timeLogs/styles`; params?: Router.UnknownInputParams; } | { pathname: `/timeLogs/viewAllTimeLogs`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
