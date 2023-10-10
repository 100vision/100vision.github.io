import{_ as i,W as n,X as r,Z as e,$ as o,a0 as l,Y as a,G as s}from"./framework-b5535326.js";const h="/assets/post63_auth_oauth_flow-3426175d.png",p="/assets/Post63_OAuth_Google_OAuth_Client_Example-a1539f53.png",c={},u=a('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>学习和了解OAuth认证授权机制。OAuth是用的比较多的身份认证，资源授权机制，微信和企业微信。</p><p>很多使用场景，很多第三方应用支持使用微信和Google账户（拥有大量用户账户资源等）登录他们的服务和应用，用户不要额外申请和注册账户。这当中使用的就是OAuth 2.0授权机制。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><h3 id="oauth授权工作流" tabindex="-1"><a class="header-anchor" href="#oauth授权工作流" aria-hidden="true">#</a> OAuth授权工作流</h3>',5),d={href:"https://www.ruanyifeng.com/blog/2019/04/oauth_design.html",target:"_blank",rel:"noopener noreferrer"},_=a('<figure><img src="'+h+'" alt="OAuth 2.0 Authorizaztion Flow" tabindex="0" loading="lazy"><figcaption>OAuth 2.0 Authorizaztion Flow</figcaption></figure><ol><li><p>用户（浏览器）使用和访问第三方服务（网站或应用。（第三方服务支持Google账户/Apple账户登录）</p></li><li><p>第三方服务返回(return 302/301) 并重定向用户（浏览器）到用户的认证服务器。（携带第三方的Callback回调url)</p></li></ol><p>3、用户登录自己的身份认证服务器，认证服务器会询问用户是否授权第三方服务访问自己的账户信息（资源），例如邮件地址/ID/头像等。</p><ol start="4"><li><p>用户授权后，用户的账户认证服务器返回授权码并重定向用户（浏览器）到第三方服务（携带。</p></li><li><p>用户（浏览器）被重定向后会携带授权码给第三方服务。</p></li><li><p>第三方服务（一般是后端）接收到授权码，由第三方的后端提交申请，申请带上授权码/Client_ID/Client_Secret到用户的认证服务器。用户（浏览器）不可见。</p></li><li><p>用户的认证服务器验证后，颁发access token，以json形式返回。</p></li><li><p>第三服务（后端）收到token后，带上token（http header里的authorization字段）访问用户的资源（例如email/ID等）</p></li><li><p>资源服务器返回用户资源给第三方服务。</p></li></ol><h3 id="使用场景和案例" tabindex="-1"><a class="header-anchor" href="#使用场景和案例" aria-hidden="true">#</a> 使用场景和案例</h3><p><strong>场景1</strong></p><p>现在很多网站支持使用Google账户/微信第三方账户等登录他们的服务，就是oAuth的实现。</p><p><strong>场景2</strong></p><p>你有一个Web应用程序，例如处理用户相片，支持用户把他的Google相册导入，处理完后存储回去到Google相册。这时，你的应用程序则要访问用户的Google相册，比如要读取或写入到Google相册。这种场景就需要使用Google OAuth。</p><p><strong>场景工作原理分析</strong></p><p>从以上场景下，各角色时这样的：</p><ul><li>你的网站是第三方服务。</li><li>微信账户提供商是认证服务商。</li><li>用户的微信账户等是用户的资源；</li><li>网站要用户授权，才能访问用户的微信账户资源，例如微信，头像或其他微信用户API资源。</li><li>网站拿到用户的微信账户资源或用户其他资源（例如相册等）</li></ul><p>可以看到，</p><ul><li>用户没有把用户和密码提交给第三方服务，安全可以保障。</li><li>第三方服务一开始拿到是一个authorization code，然后才是token令牌（有有效期的，用户可以撤销）。</li><li>第三方需要带上authorization code和表明自己身份的client_id/client_secret，才能从用户的认证服务商商拿到token. 这个client_id和secret需要第三方服务的开放者事先到身份提供商去备案申请。</li></ul><h3 id="oauth-客户端注册和创建" tabindex="-1"><a class="header-anchor" href="#oauth-客户端注册和创建" aria-hidden="true">#</a> OAuth 客户端注册和创建</h3><blockquote><p>如果你的网站服务需要支持用户使用Google或微信账户登录，则需要去这些身份提供商备案申请，其实就是申请创建一个身份提供商的OAuth Client客户端，表明身份。</p></blockquote><blockquote><p>申请时，需要指定你的网站应用程序名和需要的访问权限（例如只读或写入）、资源范围，这些信息将会被身份提供商（API资源）都展示给用户，让用户确认是否授权同意。</p></blockquote><ul><li>微信</li></ul>',18),g={href:"https://cloud.tencent.com/developer/article/1447723",target:"_blank",rel:"noopener noreferrer"},f=e("ul",null,[e("li",null,"Google OAuth")],-1),m={href:"https://console.cloud.google.com/apis/credentials",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"开发文档：",-1),A={href:"https://developers.google.com/identity/protocols/oauth2/web-server",target:"_blank",rel:"noopener noreferrer"},k=e("figure",null,[e("img",{src:p,alt:"OAuth客户端样例",tabindex:"0",loading:"lazy"}),e("figcaption",null,"OAuth客户端样例")],-1);function x(O,G){const t=s("ExternalLinkIcon");return n(),r("div",null,[u,e("p",null,[o("看到阮一峰的博客"),e("a",d,[o("这里"),l(t)]),o(" 画了一个图，不知道对不对。")]),_,e("p",null,[e("a",g,[o("https://cloud.tencent.com/developer/article/1447723"),l(t)])]),f,e("p",null,[e("a",m,[o("https://console.cloud.google.com/apis/credentials"),l(t)])]),b,e("p",null,[e("a",A,[o("https://developers.google.com/identity/protocols/oauth2/web-server"),l(t)])]),k])}const z=i(c,[["render",x],["__file","post63_auth_oauth_v2_intro_01.html.vue"]]);export{z as default};
