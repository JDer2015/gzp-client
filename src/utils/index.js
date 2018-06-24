export function getRedirectToPath(type,header) {
    let redirectTo = !header ? '/'+ type +'info' : '/'+ type
    return redirectTo

}