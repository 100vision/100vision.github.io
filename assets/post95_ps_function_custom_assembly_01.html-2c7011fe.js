import{_ as a,W as l,X as t,Z as e,$ as n,a0 as o,Y as r,G as d}from"./framework-b5535326.js";const c={},i=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),n(" 前言")],-1),p={href:"http://xn--Powershell-yh4pjcv04g4u0c237cdfj1h0gohq.Net",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"可以在Powershell里面直接编写C#代码，然后在代码里面直接使用。",-1),h=e("h2",{id:"正文",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#正文","aria-hidden":"true"},"#"),n(" 正文")],-1),_=e("blockquote",null,[e("p",null,"来自阿里千问")],-1),v=e("h3",{id:"直接定义",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#直接定义","aria-hidden":"true"},"#"),n(" 直接定义")],-1),m=e("code",null,"Add-Type",-1),b={href:"http://xn--PowerShell-4t2p79ak4c34wod105fjer60onr7ch83agx3h.NET",target:"_blank",rel:"noopener noreferrer"},k={href:"http://xn--7iqro47dixde4nbet3xnss5g3au3c986b.xn--NET-x68d57mb7auq630aoza74ec03alzh5xrf4srhxtlklqz9ro0k3e.NET",target:"_blank",rel:"noopener noreferrer"},y=e("code",null,"Add-Type",-1),f=r(`<ul><li>定义了一个简单的C#类并在PowerShell中使用：</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token function">Add-Type</span> <span class="token operator">-</span>TypeDefinition @<span class="token string">&quot;
    using System;
    public class HelloWorld {
        public static string SayHello() {
            return &quot;</span>Hello<span class="token punctuation">,</span> World!<span class="token string">&quot;;
        }
    }
&quot;</span>@

<span class="token namespace">[HelloWorld]</span>::SayHello<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>Add-Type</code>命令定义了一个名为<code>HelloWorld</code>的C#类，该类包含一个静态方法<code>SayHello</code>。然后，我们通过<code>[HelloWorld]::SayHello()</code>调用了这个方法，输出&quot;Hello, World!&quot;。</p><p><code>Add-Type</code>的一些常用参数包括：</p><ul><li><code>-TypeDefinition</code>: 用于提供类的C#或VB.NET代码。</li><li><code>-Language</code>: 指定代码的语言，如CSharp、VisualBasic等。</li><li><code>-OutputType</code>: 指定输出类型，如Class、Struct等。</li><li><code>-OutputAssembly</code>: 指定输出的DLL文件名，用于保存定义的类型。</li><li><code>-ReferencedAssemblies</code>: 引用的.NET框架的其他dll文件。</li></ul><p>请注意，使用<code>Add-Type</code>创建的类型只存在于当前PowerShell会话中。当你关闭会话后，这些类型将消失。如果你想持久化这些类型，你需要将它们保存到一个DLL文件中，然后在后续的会话中通过<code>-Path</code>参数加载这个DLL。</p><h3 id="编译封装" tabindex="-1"><a class="header-anchor" href="#编译封装" aria-hidden="true">#</a> 编译封装</h3><p>要将使用<code>Add-Type</code>创建的类型保存到一个DLL文件中，你可以使用<code>-OutputAssembly</code>参数指定输出的DLL文件名。以下是一个示例，它创建一个类并将其保存到DLL文件：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token function">Add-Type</span> <span class="token operator">-</span>TypeDefinition @<span class="token string">&quot;
    using System;
    public class MyClass {
        public string MyMethod() {
            return &quot;</span>Hello<span class="token punctuation">,</span> Persistent <span class="token function">Type</span><span class="token operator">!</span><span class="token string">&quot;;
        }
    }
&quot;</span>@ <span class="token operator">-</span>OutputAssembly <span class="token string">&quot;MyCustomTypes.dll&quot;</span> <span class="token operator">-</span>OutputType ConsoleApplication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>MyCustomTypes.dll</code>是输出的DLL文件名，<code>ConsoleApplication</code>表示输出类型为控制台应用程序。这样，<code>MyClass</code>就会被编译并保存到这个DLL文件中。</p><p>要加载这个DLL文件并在以后的PowerShell会话中使用，你可以使用<code>Add-Type</code>的<code>-Path</code>参数：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token function">Add-Type</span> <span class="token operator">-</span>Path <span class="token string">&quot;MyCustomTypes.dll&quot;</span>
<span class="token namespace">[MyClass]</span>::new<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>MyMethod<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,12),T=e("code",null,"MyClass",-1),g={href:"http://xn--DLLPowerShell-y50uo9h1qaw29byu1de4wabk9esa3431jjorazk3c.NET",target:"_blank",rel:"noopener noreferrer"},w={href:"http://xn--PowerShell-cl5pk16ej5g9m7cqz7bhq7cry0a.NET",target:"_blank",rel:"noopener noreferrer"},L={href:"http://xn--DLL-x98d23cpvw17dqvs8q1b3x9a2nqdwks5h.NET",target:"_blank",rel:"noopener noreferrer"};function x(q,N){const s=d("ExternalLinkIcon");return l(),t("div",null,[i,e("p",null,[e("a",p,[n("我们知道Powershell可以调用.Net"),o(s)]),n(" Framework的静态类，也就可以大大提高了脚本功能。熟悉C#的同学")]),u,h,_,v,e("p",null,[m,n("是PowerShell的一个命令，"),e("a",b,[n("用于在PowerShell会话中动态地添加.NET"),o(s)]),n(" Framework类。"),e("a",k,[n("它可以用来引入自定义的.NET类型或者加载未在当前环境中注册的.NET"),o(s)]),n(" DLL。"),y,n("可以让你在PowerShell中使用C#、VB.NET或其他.NET语言编写的类和方法，从而扩展PowerShell的功能。")]),f,e("p",null,[n("这将加载DLL文件，并允许你像之前一样使用"),T,n("。请注意，"),e("a",g,[n("加载的DLL文件必须与PowerShell会话的.NET"),o(s)]),n(" Framework版本兼容。"),e("a",w,[n("如果你的PowerShell运行在.NET"),o(s)]),n(" Core上，"),e("a",L,[n("那么你需要确保DLL是针对.NET"),o(s)]),n(" Core编译的。")])])}const C=a(c,[["render",x],["__file","post95_ps_function_custom_assembly_01.html.vue"]]);export{C as default};