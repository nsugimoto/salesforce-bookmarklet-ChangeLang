Change Language setting bookmarklet
----

This bookmarklet can change language setting of salesforce by one click.

Try to register this as bookmark on your Chrome or Firefox. ( Sorry for IE users :P )

If you need other language, please modify line 37.
>user.LanguageLocaleKey = /^ja/.test(userInfo.userLanguage) ? 'en_US' : 'ja';

Thanks