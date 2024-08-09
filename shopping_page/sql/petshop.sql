-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-07-30 07:07:30
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `pet`
--

-- --------------------------------------------------------

--
-- 資料表結構 `carouselevent`
--

CREATE TABLE `carouselevent` (
  `EventId` int(5) NOT NULL,
  `eventName` varchar(50) DEFAULT NULL,
  `eventImg` varchar(200) DEFAULT NULL,
  `startTime` date DEFAULT NULL,
  `endTime` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `carouselevent`
--

INSERT INTO `carouselevent` (`EventId`, `eventName`, `eventImg`, `startTime`, `endTime`) VALUES
(1, '聯合品牌', 'https://i.postimg.cc/xTm3g3wc/carousel-1.jpg', '2024-07-01', '2024-07-31'),
(2, '補水罐軍', 'https://i.postimg.cc/rwLCHtTg/carousel-2.jpg', '2024-07-01', '2024-07-31'),
(3, '好抓窩', 'https://i.postimg.cc/xqVmqDFS/carousel-3.jpg', '2024-07-01', '2024-07-31'),
(4, '一碗窩', 'https://i.postimg.cc/44m5Hgwv/carousel-4.jpg', '2024-07-01', '2024-07-31'),
(5, '美毛組', 'https://i.postimg.cc/50GLdFBy/carousel-5.jpg', '2024-06-01', '2024-06-20');

-- --------------------------------------------------------

--
-- 資料表結構 `eyesearsmouth`
--

CREATE TABLE `eyesearsmouth` (
  `id` int(4) NOT NULL,
  `name` varchar(20) NOT NULL,
  `department` varchar(500) DEFAULT NULL,
  `directions` varchar(500) DEFAULT NULL,
  `reason` varchar(500) DEFAULT NULL,
  `symptom` varchar(500) DEFAULT NULL,
  `timing` varchar(500) DEFAULT NULL,
  `check` varchar(500) DEFAULT NULL,
  `hid` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `eyesearsmouth`
--

INSERT INTO `eyesearsmouth` (`id`, `name`, `department`, `directions`, `reason`, `symptom`, `timing`, `check`, `hid`) VALUES
(1, '乾眼症', '眼科', '由於「眼睛淚腺水樣淚液」分泌減少，造成「角膜」與「結膜發炎」產生病變。 診斷上，獸醫師主要靠「臨床症狀」以及「Schirmer氏淚液試驗（STT）的試驗結果」為主，Schirmer氏淚液試驗（STT）是將「淚液試驗紙條」放置於「角膜」與「下眼瞼間」測量一分鐘水樣淚液的製造量。 犬的STT正常值>15~16mm/min、貓>10~12mm/min。若犬的SPP數值低於10mm，或貓的STT數值低於5mm加上有黏液樣或黏液膿樣分泌物及結膜炎的發生，則獸醫師就會強烈懷疑您的毛寶貝患有乾眼症。', '自體免疫性、先天淚腺發育不良、眼內發炎或是不當使用某些眼藥....等', '外觀可見毛寶貝的眼睛分泌物異常增加，如：大量黏稠的眼屎（特別是早上），紅眼（血絲多），眼睛中的角膜失去原有的明亮與光澤，可能還會伴隨色素沉澱', '中老年時期的狗狗貓貓更容易發生', NULL, 1),
(2, '結膜炎', '眼科', '出現頻繁的搔抓、揉眼睛等舉動，此時可能就是在告訴你寵物的眼睛正感覺到疼痛。 有時也會伴有隨羞明、流淚、結膜充血、分泌物增多...等症狀發生。', '', NULL, '白內障及水晶體核硬化症是9歲以上的老年寵物最常見的眼睛疾病。估計在9歲以上的寵物約有50％的發生率，而13歲以上的寵物高達100％的發生率。', '醫師會透過「淚液試紙檢查」、「螢光染劑檢查」、「外觀視診」來做確診。', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `heal`
--

CREATE TABLE `heal` (
  `healid` int(5) NOT NULL,
  `hid` int(5) NOT NULL,
  `howTocheck` varchar(500) DEFAULT NULL,
  `howToheal` varchar(500) DEFAULT NULL,
  `healDetail` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `heal`
--

INSERT INTO `heal` (`healid`, `hid`, `howTocheck`, `howToheal`, `healDetail`) VALUES
(0, 1, NULL, '提供局部的潤滑', '如：人工淚液或人工淚膏的使用'),
(1, 1, NULL, '刺激淚液的產生', '使用CYCLOSPORINE眼藥膏，每日兩次，可以增加淚液的生成及改善角結膜炎的情況。另外1~4滴PILOCARPINE 2% 眼藥水口服也達到刺激類易產生的效果'),
(2, 1, NULL, '治療繼發的細菌感染', NULL),
(3, 1, NULL, '在無角膜潰瘍的情況下，可以使用類固醇藥膏減緩眼睛的發炎', NULL),
(4, 1, NULL, '清潔眼睛周圍的分泌物', NULL),
(5, 2, '醫師會透過「淚液試紙檢查」、「螢光染劑檢查」、「外觀視診」來做確診。', NULL, '當確診為結膜炎後，可以使用生理鹽水、2~3%硼酸水或1%明礬溶液來清洗患畜的眼睛，然後給予眼藥水或眼藥膏。');

-- --------------------------------------------------------

--
-- 資料表結構 `productandclass`
--

CREATE TABLE `productandclass` (
  `productId` int(20) NOT NULL,
  `productClassid` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `productandclass`
--

INSERT INTO `productandclass` (`productId`, `productClassid`) VALUES
(1, 1),
(2, 1),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(5, 1),
(5, 2),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2);

-- --------------------------------------------------------

--
-- 資料表結構 `productandtag`
--

CREATE TABLE `productandtag` (
  `productId` int(20) NOT NULL,
  `productTagId` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `productandtag`
--

INSERT INTO `productandtag` (`productId`, `productTagId`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `productbrand`
--

CREATE TABLE `productbrand` (
  `bhId` int(100) NOT NULL,
  `brand` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `productbrand`
--

INSERT INTO `productbrand` (`bhId`, `brand`) VALUES
(1, '美喵人生 O\'KAT'),
(2, '野起來吃 Wild Feeding'),
(3, '天然密碼'),
(4, '波瑞歐'),
(5, '愛普士'),
(6, 'wanwan');

-- --------------------------------------------------------

--
-- 資料表結構 `productclass`
--

CREATE TABLE `productclass` (
  `productClassid` int(20) NOT NULL,
  `productClassname` varchar(50) DEFAULT NULL,
  `productClassimg` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `productclass`
--

INSERT INTO `productclass` (`productClassid`, `productClassname`, `productClassimg`) VALUES
(1, '貓咪食物', 'https://i.postimg.cc/Y9cbcSbw/class-catfood.png'),
(2, '狗狗食物', 'https://i.postimg.cc/sDK6BsDp/class-dogfood.png'),
(3, '寵物保健', 'https://i.postimg.cc/W139gChx/class-healthfood.png'),
(4, '寵物玩具', 'https://i.postimg.cc/d0Z4SCRB/class-toy.png'),
(5, '寵物美容', 'https://i.postimg.cc/nrnvG9c0/class-beauty.png'),
(6, '寵物清潔', 'https://i.postimg.cc/6QGLWNmL/class-clean.png');

-- --------------------------------------------------------

--
-- 資料表結構 `productformat`
--

CREATE TABLE `productformat` (
  `fhid` int(20) NOT NULL,
  `format` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `productformat`
--

INSERT INTO `productformat` (`fhid`, `format`) VALUES
(0, '鮮雞4蔬'),
(1, '鮪魚+雞'),
(2, '美味雞'),
(3, '土雞'),
(4, '鮭魚'),
(5, '羊'),
(6, '烏骨雞'),
(7, '鵝'),
(8, '鮭魚+鯡魚+曼哈頓魚'),
(9, '鴨肉+火雞'),
(10, '雞柳+鮭魚+蔬菜'),
(11, '雞柳+牛肝+蔬菜'),
(12, '雞柳+鮪魚+蔬菜'),
(13, '青汁嫩雞'),
(14, '親子丼'),
(15, '鮮雞4蔬');

-- --------------------------------------------------------

--
-- 資料表結構 `productshop`
--

CREATE TABLE `productshop` (
  `productId` int(5) NOT NULL,
  `productName` varchar(50) DEFAULT NULL,
  `shid` int(255) NOT NULL,
  `fhid` int(100) DEFAULT NULL,
  `bhId` int(100) DEFAULT NULL,
  `productImg` varchar(200) DEFAULT NULL,
  `productContent` varchar(1000) DEFAULT NULL,
  `productContentimg` varchar(200) DEFAULT NULL,
  `price` int(255) DEFAULT NULL,
  `productDiscount` float DEFAULT NULL,
  `quantity` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `productshop`
--

INSERT INTO `productshop` (`productId`, `productName`, `shid`, `fhid`, `bhId`, `productImg`, `productContent`, `productContentimg`, `price`, `productDiscount`, `quantity`) VALUES
(1, '《美喵人生 O\'KAT》冷凍乾燥生肉糧 | 鮪魚+雞｜貓冷凍脫水乾糧', 1, 1, 1, 'https://i.postimg.cc/zfSgdJnz/O-KAT.jpg', '■  高含肉量：95.5%含肉量，優質蛋白質鮪魚、雞肉、雞肝，雞心。\r\n■  營養加倍：添加德國家醫貓王生食營養粉3％，補充維生素、礦物質、牛磺酸。\r\n■  優質保證：台灣製造經全國公證食品檢驗，符合AAFCO貓糧營養均衡標準。\r\n■  冷凍乾燥：保持食材完整營養，無麩質、無穀類、無玉米。\r\n\r\n【規格】\r\n■ 容量：70g / 300g\r\n■ 產地：台灣（添加德國家醫 貓王生食必須營養粉）\r\n■ 適用對象：貓', NULL, 200, 0.8, 10),
(2, '《美喵人生 O\'KAT》冷凍乾燥生肉糧 | 美味雞｜貓冷凍脫水乾糧', 1, 2, 1, 'https://i.postimg.cc/1XWTDhWM/O-KAT.jpg', '■  高含肉量：95.7%含肉量，優質蛋白質雞肉、雞肝，雞心。\r\n■  營養加倍：添加德國家醫貓王生食營養粉3％，補充維生素、礦物質、牛磺酸。\r\n■  優質保證：台灣製造經全國公證食品檢驗，符合AAFCO貓糧營養均衡標準。\r\n■  冷凍乾燥：保持食材完整營養，無麩質、無穀類、無玉米。\r\n\r\n【規格】\r\n■ 容量：70g / 300g\r\n■ 產地：台灣', NULL, 210, 0.85, 110),
(3, '《野起來吃 Wild Feeding》生食(土雞)｜犬貓冷凍生食300g｜鹿野土雞｜冷凍配送', 2, 3, 2, 'https://i.postimg.cc/X7BFTN6L/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n\r\n【規格】\r\n■ 重量：300g \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.9, 100),
(4, '《野起來吃 Wild Feeding》生食(鮭)｜犬貓冷凍生食300g｜阿拉斯加野生鮭｜冷凍配送', 2, 4, 2, 'https://i.postimg.cc/J0kndnHB/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n■ 阿拉斯加野生鮭魚，因為吃的是野生的小魚、小蝦，富含 Omega --不飽和脂肪酸，生長在無汙染海域。對比之下，養殖的挪威鮭魚與智利鮭魚因為吃的是飼料，所含 Omega-3 極少，也沒有殺蟲劑與乙氧䤆污染的問題。 \r\n\r\n【規格】 \r\n■ 重量：300g\r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 150, 1, 100),
(5, '《野起來吃 Wild Feeding》生食(羊)｜犬貓冷凍生食300g｜澳洲草飼羊｜冷凍配送', 2, 5, 2, 'https://i.postimg.cc/3R6NBpNT/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n\r\n【規格】 \r\n■ 重量：300g \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.8, 100),
(6, '《野起來吃 Wild Feeding》生食(烏骨雞)｜犬貓冷凍生食300g｜烏骨雞｜冷凍配送', 2, 6, 2, 'https://i.postimg.cc/4xbKgmL6/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n\r\n【規格】\r\n■ 重量：300g \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.8, 100),
(7, '《野起來吃 Wild Feeding》生食(鵝)｜犬貓冷凍生食300g｜快樂鵝｜冷凍配送', 2, 7, 2, 'https://i.postimg.cc/pyMTNHKc/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n■ 雲林號稱「養鵝王國」，台灣鵝產量一半來自雲林，雲林鵝肉富含豐富蛋白質、脂肪、鈣、磷、鐵、錳、維生素（A、B、C），是理想的高蛋白、低脂肪、低膽固醇的肉品，不僅脂肪含量低，而且品質好，不飽和脂肪酸的含量高，也是離胺酸相對精胺酸較高的肉品。\r\n\r\n【規格】\r\n■ 重量：300g \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.8, 100),
(8, '《天然密碼》鮭魚+鯡魚+曼哈頓魚｜皮膚毛髮保健｜無穀全齡貓配方｜貓顆粒乾糧', 3, 8, 3, 'https://i.postimg.cc/RV0tTQ2b/image.jpg', '■ 添加10種功能性天然綜合超級食材。\r\n■ 87%動物性蛋白，0%穀物麩質、動物副產品。\r\n■ 添加益生菌及益菌生，呵護腸道幫助消化。\r\n■ 支持泌尿系統健康，幫助控制毛球。\r\n■ 鮭魚：不飽和脂肪酸，幫助貓咪皮膚及毛髮健康\r\n■ 鯡魚：富含牛磺酸，維持心血管、眼睛健康及維持自然抵抗力。\r\n■ 曼哈頓魚：含豐富的多元脂肪酸，幫助保護皮膚屏障\r\n■ 適合全年齡貓咪，提供完整的營養及豐富維生素與礦物質。\r\n\r\n【規格】 \r\n■ 重量：227g / 1.1kg / 5kg\r\n■ 產地：美國\r\n■ 適用對象：貓', NULL, 200, 0.8, 100),
(9, '《天然密碼》鴨肉+火雞肉｜關節保健｜無穀全齡貓配方｜貓顆粒乾糧', 3, 9, 3, 'https://i.postimg.cc/J4jcd3XK/image.jpg', '■ 添加10種功能性天然綜合超級食材。\r\n■ 87%動物性蛋白，0%穀物麩質、動物副產品。\r\n■ 添加益生菌及益菌生，呵護腸道幫助消化。\r\n■ 支持泌尿系統健康，幫助控制毛球。\r\n■ 鮭魚：不飽和脂肪酸，幫助貓咪皮膚及毛髮健康\r\n■ 鯡魚：富含牛磺酸，維持心血管、眼睛健康及維持自然抵抗力。\r\n■ 曼哈頓魚：含豐富的多元脂肪酸，幫助保護皮膚屏障\r\n■ 適合全年齡貓咪，提供完整的營養及豐富維生素與礦物質。\r\n\r\n【規格】 \r\n■ 重量：227g / 1.1kg / 5kg\r\n■ 產地：美國\r\n■ 適用對象：貓', NULL, 250, 0.8, 100),
(10, '《天然密碼》雞肉+火雞肉｜消化保健｜無穀幼貓及高活動量配方｜貓顆粒乾糧', 3, 2, 3, 'https://i.postimg.cc/WzYw798T/image.jpg', '■ 添加10種功能性天然綜合超級食材。\r\n■ 89%動物性蛋白，0%穀物麩質、動物副產品。\r\n■ 添加益生菌及益菌生，呵護腸道幫助消化。\r\n■ 支持泌尿系統健康，幫助控制毛球。\r\n■ 雞肉：優質蛋白質，消化率高達92%。\r\n■ 鯡魚：富含牛磺酸，維持心血管、眼睛健康及維持自然抵抗力。\r\n■ 火雞肉：瘦肉蛋白質來源，適合腸胃敏感的貓咪。\r\n■ 適合幼貓及高活動量的貓咪，提供完整的營養及豐富維生素與礦物質。\r\n\r\n【規格】 \r\n■ 重量：227g / 1.1kg / 5kg\r\n■ 產地：美國\r\n■ 適用對象：貓', NULL, 220, 0.8, 100),
(11, '《wanwanO》熟齡貓(雞)｜無穀高齡貓關節護理配方｜貓顆粒乾糧', 4, 2, 6, 'https://i.postimg.cc/Ls8tXrb0/BOREAL.jpg', '■ 調整蛋白質、脂肪和纖維含量：適合熟齡貓或室內貓，照顧貓咪整體健康。\r\n■ 低升糖指數飲食：延長飽足感，減少血糖高峰，有助於控制血糖穩定。\r\n■ 獨家鋅專利礦物質配方：提供全方位的代謝和免疫支持。\r\n■ 含豐富消化酵素、益生菌和保健草本食材：照顧貓咪腸道健康。\r\n\r\n【規格】\r\n■ 重量：5LB（2.26kg）／12LB（5.44kg）\r\n■ 產地：加拿大\r\n■ 適用對象：貓', NULL, 300, 0.8, 100),
(12, '《wanwanO》全齡貓(雞)｜無穀室內貓化毛調理配方｜貓顆粒乾糧', 4, 2, 6, 'https://i.postimg.cc/6pwLs7LK/BOREAL.jpg', '■ 調整蛋白質、脂肪和纖維含量：適合熟齡或室內貓，有助於體重控制。\r\n■ 高纖維、低脂肪配方：維護貓咪健康體態，有助於控制體重。\r\n■ 低升糖指數飲食：有助於維持貓咪健康血糖。\r\n■ 獨家鋅專利礦物質配方：提供全方位的代謝和免疫支持。\r\n■ 含豐富消化酵素、益生菌和保健草本食材：照顧貓咪腸道健康。\r\n\r\n【規格】\r\n■ 重量：5LB（2.26kg）／12LB（5.44kg）\r\n■ 產地：加拿大\r\n■ 適用對象：貓', NULL, 300, 0.8, 100),
(13, '愛普士 Applaws全天然犬罐156g雞柳狗副食罐', 5, 2, 5, 'https://i.postimg.cc/1zvcxkLq/Applaws-156g.jpg', '■ 熱量：66kcal／100g \r\n\r\n■ 愛普士全天然犬罐所用之食材為特選有機飼料飼養之雞隻，均不施打抗生素及賀爾蒙以及天然海域中最上等之魚肉。 \r\n\r\n【規格】 \r\n■ 重量：156g\r\n■ 產地：泰國 \r\n■ 適用對象：狗', NULL, 160, NULL, 100),
(14, '《愛普士 Applaws》全天然犬罐156g｜雞柳+鮭魚+蔬菜｜狗副食罐', 5, 10, 5, 'https://i.postimg.cc/50j5fPVk/Applaws-156g.jpg', '■ 熱量：57kcal／100g \r\n\r\n■ 愛普士全天然犬罐所用之食材為特選有機飼料飼養之雞隻，均不施打抗生素及賀爾蒙以及天然海域中最上等之魚肉。 \r\n\r\n【規格】 \r\n■ 重量：156g\r\n■ 產地：泰國 \r\n■ 適用對象：狗', NULL, 160, NULL, 100),
(15, '《愛普士 Applaws》全天然犬罐156g｜雞柳+牛肝+蔬菜｜狗副食罐', 5, 11, 5, 'https://i.postimg.cc/CKhHQh60/Applaws-156g.jpg', '■ 熱量：75kcal／100g\r\n\r\n■ 愛普士全天然犬罐所用之食材為特選有機飼料飼養之雞隻，均不施打抗生素及賀爾蒙以及天然海域中最上等之魚肉。 \r\n\r\n【規格】 \r\n■ 重量：156g\r\n■ 產地：泰國 \r\n■ 適用對象：狗', NULL, 160, NULL, 100),
(16, '《愛普士 Applaws》全天然犬罐156g｜雞柳+鮪魚+蔬菜｜狗副食罐', 5, 12, 5, 'https://i.postimg.cc/HL0SKv2G/Applaws-156g.jpg', '■ 熱量：57kcal／100g \r\n\r\n■ 愛普士全天然犬罐所用之食材為特選有機飼料飼養之雞隻，均不施打抗生素及賀爾蒙以及天然海域中最上等之魚肉。 \r\n\r\n【規格】 \r\n■ 重量：156g\r\n■ 產地：泰國 \r\n■ 適用對象：狗', NULL, 160, NULL, 100),
(17, '《wanwan》注文時刻犬用營養餐包80g｜青汁嫩雞｜狗副食罐', 6, 13, 6, 'https://i.postimg.cc/nzmsdqkW/wanwan-80g.jpg', '■ 旨在讓狗狗也能品嚐到道地的和風滋味。\r\n■ 嚴選多種特色日式料理的食材，將其精華完美鎖進餐包中，並配合狗狗的每日營養需求進行調整，是兼顧營養和美味的高級犬用濕糧。\r\n■ 滿滿的雞肉與雞高湯滿足狗狗口腹。 \r\n■ 青汁有豐富的蔬果，讓狗狗能攝取維生素。 \r\n■ 天然無穀、無麩質。 \r\n■ 成分簡單能避開已知過敏原。 \r\n■ 日本原裝製作進口。 \r\n\r\n【規格】 \r\n■ 容量：80g \r\n■ 產地：日本\r\n■ 適用對象：狗', NULL, 210, NULL, 100),
(18, '《wanwan》注文時刻犬用營養餐包80g｜親子丼｜狗副食罐', 6, 14, 6, 'https://i.postimg.cc/gkwLTF25/wanwan-80g.jpg', '■ 旨在讓狗狗也能品嚐到道地的和風滋味。\r\n■ 嚴選多種特色日式料理的食材，將其精華完美鎖進餐包中，並配合狗狗的每日營養需求進行調整，是兼顧營養和美味的高級犬用濕糧。\r\n■ 雞肉口味餐包滿足狗狗口腹。 \r\n■ 天然無穀、無麩質。 \r\n■ 成分簡單能避開已知過敏原。 \r\n■ 日本原裝製作進口。 ', NULL, 210, NULL, 100),
(19, '《wanwan》注文時刻犬用營養餐包80g｜鮮雞4蔬｜狗副食罐', 6, 15, 6, 'https://i.postimg.cc/2511gmJm/wanwan-80g-4.jpg', '■ 滿滿的雞肉與雞高湯滿足狗狗口腹。 \r\n■ 豐富的蔬果，讓狗狗能攝取維生素。 \r\n■ 天然無穀、無麩質。 \r\n■ 成分簡單能避開已知過敏原。 \r\n■ 日本原裝製作進口。 \r\n\r\n【規格】 \r\n■ 容量：80g \r\n■ 產地：日本 \r\n■ 適用對象：狗', NULL, 210, NULL, 100);

-- --------------------------------------------------------

--
-- 資料表結構 `producttag`
--

CREATE TABLE `producttag` (
  `productTagId` int(20) NOT NULL,
  `tagName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `producttag`
--

INSERT INTO `producttag` (`productTagId`, `tagName`) VALUES
(1, '冷凍乾燥'),
(2, '無麩質'),
(3, '台灣製造'),
(4, '頂級生食'),
(5, '冷凍生食'),
(6, '添加益生菌'),
(7, '關節保健'),
(8, '消化保健'),
(9, '飽足感'),
(10, '化毛調理'),
(11, '幼犬'),
(12, '成犬'),
(13, '幼貓'),
(14, '成貓');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `carouselevent`
--
ALTER TABLE `carouselevent`
  ADD PRIMARY KEY (`EventId`);

--
-- 資料表索引 `eyesearsmouth`
--
ALTER TABLE `eyesearsmouth`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hid` (`hid`);

--
-- 資料表索引 `heal`
--
ALTER TABLE `heal`
  ADD PRIMARY KEY (`healid`),
  ADD KEY `hid` (`hid`);

--
-- 資料表索引 `productandclass`
--
ALTER TABLE `productandclass`
  ADD PRIMARY KEY (`productId`,`productClassid`),
  ADD KEY `productId` (`productId`),
  ADD KEY `productClassid` (`productClassid`);

--
-- 資料表索引 `productandtag`
--
ALTER TABLE `productandtag`
  ADD PRIMARY KEY (`productId`,`productTagId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `productTagId` (`productTagId`) USING BTREE;

--
-- 資料表索引 `productbrand`
--
ALTER TABLE `productbrand`
  ADD PRIMARY KEY (`bhId`);

--
-- 資料表索引 `productclass`
--
ALTER TABLE `productclass`
  ADD PRIMARY KEY (`productClassid`);

--
-- 資料表索引 `productformat`
--
ALTER TABLE `productformat`
  ADD PRIMARY KEY (`fhid`);

--
-- 資料表索引 `productshop`
--
ALTER TABLE `productshop`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `bhId` (`bhId`),
  ADD KEY `fhid` (`fhid`);

--
-- 資料表索引 `producttag`
--
ALTER TABLE `producttag`
  ADD PRIMARY KEY (`productTagId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `eyesearsmouth`
--
ALTER TABLE `eyesearsmouth`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `productshop`
--
ALTER TABLE `productshop`
  MODIFY `productId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `heal`
--
ALTER TABLE `heal`
  ADD CONSTRAINT `heal_ibfk_1` FOREIGN KEY (`hid`) REFERENCES `eyesearsmouth` (`hid`);

--
-- 資料表的限制式 `productandclass`
--
ALTER TABLE `productandclass`
  ADD CONSTRAINT `productandclass_ibfk_1` FOREIGN KEY (`productClassid`) REFERENCES `productclass` (`productClassid`),
  ADD CONSTRAINT `productandclass_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `productshop` (`productId`);

--
-- 資料表的限制式 `productandtag`
--
ALTER TABLE `productandtag`
  ADD CONSTRAINT `productandtag_ibfk_1` FOREIGN KEY (`productTagId`) REFERENCES `producttag` (`productTagId`),
  ADD CONSTRAINT `productandtag_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `productshop` (`productId`);

--
-- 資料表的限制式 `productshop`
--
ALTER TABLE `productshop`
  ADD CONSTRAINT `productshop_ibfk_1` FOREIGN KEY (`bhId`) REFERENCES `productbrand` (`bhId`),
  ADD CONSTRAINT `productshop_ibfk_2` FOREIGN KEY (`fhid`) REFERENCES `productformat` (`fhid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
