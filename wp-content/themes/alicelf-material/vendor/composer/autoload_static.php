<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb6f04ed7e1f797b95ad60e857e3cc76d
{
    public static $files = array (
        '541ae616241342009f57916e2e87ef9f' => __DIR__ . '/../..' . '/AlicelfMaterial/redux/ReduxCore/framework.php',
        'e1188992f6c461e5d5793bf9ad65fd4a' => __DIR__ . '/../..' . '/AlicelfMaterial/redux/config.php',
        '982c9002c12920c2ec9966b8680fa3e3' => __DIR__ . '/../..' . '/AlicelfMaterial/ng_dirrectives.php',
        '9ddef3587d0ea992a5107bf3fcf312d5' => __DIR__ . '/../..' . '/AlicelfMaterial/ajax.php',
        'a327e9e384d48f89bf84dece90446a56' => __DIR__ . '/../..' . '/AlicelfMaterial/ajax.user.php',
        '9e1e0c7e56a72520bb36ff6342516c8e' => __DIR__ . '/../..' . '/AlicelfMaterial/ajax.woo.php',
        '483f980016bb7a9172a59c66184115cf' => __DIR__ . '/../..' . '/AlicelfMaterial/user/init.php',
        'f3b19fdb945bea8a7f9f7e43c0dd64e9' => __DIR__ . '/../..' . '/AlicelfMaterial/sidebars.php',
        '8b2ad1836f1688f773463ec916e32ac1' => __DIR__ . '/../..' . '/AlicelfMaterial/form_actions.php',
        'a8f85bcc4c14901533ab94bfd43f4093' => __DIR__ . '/../..' . '/AlicelfMaterial/media_links.php',
        '593310181a80f0432011dfb3beaad8c9' => __DIR__ . '/../..' . '/AlicelfMaterial/action_filters.php',
        '10d49c37afd9ed2c6266a5d32f594e91' => __DIR__ . '/../..' . '/AlicelfMaterial/shortcodes.php',
        '5f180e7aed6c46e48e31acc8ea405794' => __DIR__ . '/../..' . '/AlicelfMaterial/woocommerce.php',
        '0a120ed02bc6ca80a888974e7db6554e' => __DIR__ . '/../..' . '/AlicelfMaterial/menus.php',
        '3b6ff1405d3cb32935eda3e027b11b1b' => __DIR__ . '/../..' . '/AlicelfMaterial/plugins_deps/init.php',
        '0ef6c611715cb33ad0129badaabc1915' => __DIR__ . '/../..' . '/AlicelfMaterial/theme_functions.php',
        'fa3695581d5d9ae45f46cbc34e6329b5' => __DIR__ . '/../..' . '/AlicelfMaterial/dynamic_styles.php',
        '9b9b5b1ffa9e298546c8b6cf7015f0f3' => __DIR__ . '/../..' . '/AlicelfMaterial/AMenu.php',
    );

    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'AlicelfMaterial\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'AlicelfMaterial\\' => 
        array (
            0 => __DIR__ . '/../..' . '/AlicelfMaterial',
        ),
    );

    public static $classMap = array (
        'AlicelfMaterial\\Helpers\\AmAttachment' => __DIR__ . '/../..' . '/AlicelfMaterial/Helpers/AmAttachment.php',
        'AlicelfMaterial\\Helpers\\AmDb' => __DIR__ . '/../..' . '/AlicelfMaterial/Helpers/AmDb.php',
        'AlicelfMaterial\\Helpers\\Arr' => __DIR__ . '/../..' . '/AlicelfMaterial/Helpers/Arr.php',
        'AlicelfMaterial\\Helpers\\Helper' => __DIR__ . '/../..' . '/AlicelfMaterial/Helpers/Helper.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb6f04ed7e1f797b95ad60e857e3cc76d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb6f04ed7e1f797b95ad60e857e3cc76d::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitb6f04ed7e1f797b95ad60e857e3cc76d::$classMap;

        }, null, ClassLoader::class);
    }
}
