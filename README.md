# apé
> Ultra-minimalistic Node.js redirect server.

When you need a simple redirect server, to redirect subdomains, HTTP to HTTPS or even your own URL shortener.

The only thing you need to do is deploy this repository and add your redirects to `redirects.json` file. 

After deployed, all the HTTP requests will look for a registered request inside this file and will redirect using a standard HTTP redirect with `Location` header and an optional status code.

## How to use

### 1. Modify `redirects.json`, adding your own redirects, in form:
```
{
  host: "myhost.com",
  path: "/mypath",
  destination: "https://url.to/be/redirected,
  status: 301
}
```

- **`host`** will match URL's hostname and port. i.e. `https://google.com:123/search?q=term` host is `google.com:123`
- **`path`** will match the entire path and query after `host`. i.e. `https://google.com:123/search?q=term` path is `/search?q=term`
- **`destination`** should be any valid URL. If not present, will be redirected to `defaultDestination`.
- **`status`** should be any valid HTTP status code. If not present, will be used code 302.

#### Host and path precedence

Apé will check request URL and look `redirects` for:

1. Both `host` and `path` of URL.
2. Only `host` of URL.
3. Only `path` of URL.
4. If not found a redirect rule, it will redirect to default configured destination in `redirects.json` file.

### 2. Deploy to your favorite cloud.

#### Microsoft Azure

This repository is already configured for an Azure deployment. If you use this cloud, follow the steps below.

1. Create an App Service.
2. Click *Deployment options* and choose `External Git Repository`.
3. Put this repository clone URL and follow on.
4. Await for deploy and access `https://yourappname.scm.azurewebsites.net/dev/wwwroot/redirects.json` to edit the redirects.
5. _Et voilá!_

> This release was tested with Node 8.9.4. Some used JavaScript features, as _`const` declaration_ and _string interpolation_ may not work with older versions.   
>   
> To make sure your app will work with this release, change `WEBSITE_NODE_DEFAULT_VERSION` to `8.9.4` in **Application settings** section.   
> 
> If you can't upgrade your Node version, consider using Babel to transpile apé's to an older ECMAScript version.

#### Other clouds

PLEASE. Make a pull request!

## Roadmap

- Full URL matching
- Regex URL matching
- Other cloud deploying configurations
- Variables to use with destination URLs  
