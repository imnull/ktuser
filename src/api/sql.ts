export const CREATE_DATABASE = 'CREATE DATABASE IF NOT EXISTS `ktuser` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;'

export const CREATE_TABLES = [
    "CREATE TABLE `config_applist` (`id` int NOT NULL, `app_id` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `app_type` int NOT NULL, `app_status` tinyint NOT NULL DEFAULT '0', `app_name` varchar(64) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
    "CREATE TABLE `config_apptype` (`id` int NOT NULL,`typename` varchar(16) NOT NULL,`description` varchar(64) DEFAULT NULL,`status` tinyint NOT NULL DEFAULT '0') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
    "CREATE TABLE `config_userprops` (`id` int NOT NULL,`prop_app` int NOT NULL,`prop_key` varchar(128) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,`prop_name` varchar(256) NOT NULL,`prop_min` int NOT NULL DEFAULT '0',`prop_max` int NOT NULL DEFAULT '16',`prop_sort` int NOT NULL DEFAULT '0',`status` tinyint NOT NULL DEFAULT '0') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
    "CREATE TABLE `user_list` (`id` bigint NOT NULL,`user_id` int NOT NULL,`app_id` int NOT NULL,`status` tinyint NOT NULL DEFAULT '0') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
    "CREATE TABLE `user_main` (`id` int NOT NULL,`uid` char(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
    "CREATE TABLE `user_props` (`userlist_id` bigint NOT NULL,`prop_id` int NOT NULL,`prop_value` text NOT NULL,`status` tinyint NOT NULL DEFAULT '0',`id` bigint NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
    "CREATE TABLE `user_token` (`userlist_id` bigint NOT NULL,`token` varchar(128) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,`expired` int NOT NULL,`updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,`status` tinyint NOT NULL DEFAULT '0') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
    "INSERT INTO `config_applist` (`id`, `app_id`, `app_type`, `app_status`, `app_name`) VALUES(1, 'wx9392eccb2268d4a8', 1, 0, 'MK的工具箱');",
    "INSERT INTO `config_apptype` (`id`, `typename`, `description`, `status`) VALUES(1, 'wx', '微信小程序', 0),(2, 'bd', '百度小程序', 0),(3, 'tt', '头条小程序', 0),(4, 'my', '支付宝小程序', 0),(5, 'dy', '抖音小程序', 0);",
    "INSERT INTO `config_userprops` (`id`, `prop_app`, `prop_key`, `prop_name`, `prop_min`, `prop_max`, `prop_sort`, `status`) VALUES(1, 1, 'nickname', '昵称', 0, 16, 0, 0),(2, 1, 'intro', '介绍一下自己吧', 0, 200, 0, 0);",
    "INSERT INTO `user_list` (`id`, `user_id`, `app_id`, `status`) VALUES(1, 1, 1, 0);",
    "INSERT INTO `user_main` (`id`, `uid`) VALUES(1, '0000000000000000000000000000000000000000000000000000000000000000');",
    "INSERT INTO `user_props` (`userlist_id`, `prop_id`, `prop_value`, `status`, `id`) VALUES (1, 1, 'marvin', 0, 1), (1, 2, 'I am then programer and the administrator', 0, 2);",
    "ALTER TABLE `config_applist` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `applist_appunique` (`app_id`,`app_type`), ADD KEY `applist_apptype` (`app_type`), ADD KEY `applist_appid` (`app_id`), ADD KEY `applist_appstatus` (`app_status`);",
    "ALTER TABLE `config_apptype` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `app_typename` (`typename`), ADD KEY `app_typestatus` (`status`);",
    "ALTER TABLE `config_userprops` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `userprops_key` (`prop_key`), ADD UNIQUE KEY `userprops_uniquekey` (`prop_app`,`prop_key`), ADD KEY `userprops_status` (`status`), ADD KEY `userprops_min` (`prop_min`), ADD KEY `userprops_max` (`prop_max`), ADD KEY `userprops_app` (`prop_app`), ADD KEY `userprops_sort` (`prop_sort`);",
    "ALTER TABLE `user_list` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `userlist_userunique` (`user_id`,`app_id`), ADD KEY `userlist_userid` (`user_id`), ADD KEY `userlist_appid` (`app_id`), ADD KEY `userlist_status` (`status`);",
    "ALTER TABLE `user_main` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `user_uid` (`uid`);",
    "ALTER TABLE `user_props` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `proplist_unique` (`userlist_id`,`prop_id`), ADD KEY `proplist_propid` (`prop_id`), ADD KEY `proplist_status` (`status`), ADD KEY `proplist_userlistid` (`userlist_id`) USING BTREE;",
    "ALTER TABLE `user_props` ADD FULLTEXT KEY `proplist_propvalue` (`prop_value`);",
    "ALTER TABLE `user_token` ADD PRIMARY KEY (`userlist_id`), ADD KEY `usertoken_update` (`updatetime`), ADD KEY `usertoken_status` (`status`);",
    "ALTER TABLE `config_applist` MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;",
    "ALTER TABLE `config_apptype`  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;",
    "ALTER TABLE `config_userprops` MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;",
    "ALTER TABLE `user_list` MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;",
    "ALTER TABLE `user_main` MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;",
    "ALTER TABLE `user_props` MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;",
    "ALTER TABLE `config_applist` ADD CONSTRAINT `fk_applist_apptype` FOREIGN KEY (`app_type`) REFERENCES `config_apptype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;",
    "ALTER TABLE `config_userprops` ADD CONSTRAINT `fk_userprops_applist` FOREIGN KEY (`prop_app`) REFERENCES `config_applist` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;",
    "ALTER TABLE `user_list` ADD CONSTRAINT `fk_userlist_applist` FOREIGN KEY (`app_id`) REFERENCES `config_applist` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT, ADD CONSTRAINT `fk_userlist_usermain` FOREIGN KEY (`user_id`) REFERENCES `user_main` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;",
    "ALTER TABLE `user_props` ADD CONSTRAINT `fk_proplist_props` FOREIGN KEY (`prop_id`) REFERENCES `config_userprops` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT, ADD CONSTRAINT `fk_proplist_userlistid` FOREIGN KEY (`userlist_id`) REFERENCES `user_list` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;",
    "ALTER TABLE `user_token` ADD CONSTRAINT `fk_usertoken_userlist` FOREIGN KEY (`userlist_id`) REFERENCES `user_list` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;",
]

export const APP_TYPE_LIST = `SELECT * FROM config_apptype;`
export const APP_TYPE_GET_ID = `SELECT id FROM config_apptype WHERE status>=0 AND typename=?;`