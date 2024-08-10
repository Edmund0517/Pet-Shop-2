-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-08-08 16:43:38
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
-- 資料表結構 `animal`
--

CREATE TABLE `animal` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `animal`
--

INSERT INTO `animal` (`id`, `name`) VALUES
(1, '貓'),
(2, '大型犬'),
(3, '小型犬');

-- --------------------------------------------------------

--
-- 資料表結構 `beauty`
--

CREATE TABLE `beauty` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `beauty`
--

INSERT INTO `beauty` (`id`, `name`, `address`, `location_id`, `startTime`, `endTime`, `day`) VALUES
(1, 'LubyPet路比寵物美容坊', '台北市信義區仁愛路四段468號', 1, '10:00:00', '20:00:00', 'Tue,Wed,Thu,Fri,Sat,Sun'),
(2, '毛尾巴Furry Tail', '台北市大安區大安路一段205號', 1, '10:00:00', '19:00:00', 'Mon,Tue,Thu,Fri,Sat,Sun'),
(3, 'Go澡堂寵物美容', '台北市中山區林森北路629巷1號', 1, '11:00:00', '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(4, '狗樂子寵物沙龍', '台北市大安區信義路三段128號2樓', 1, '11:00:00', '20:00:00', 'Mon,Tue,Thu,Fri,Sat,Sun'),
(5, 'PetVida薇達寵物精品沙龍', '台北市中山區長安東路二段220號', 1, '10:30:00', '19:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(6, '洗澡吧！Let\'s spa 寵物澡堂', '台北市內湖區成功路四段328號', 1, '10:00:00', '20:00:00', 'Tue,Wed,Thu,Fri,Sat,Sun'),
(7, '沛果寵物沙龍', '台中市南屯區文心一路385號', 4, '10:00:00', '19:00:00', 'Tue,Wed,Thu,Fri,Sat,Sun'),
(8, '上揚寵物精緻美容屋', '台中市西屯區青海路一段10號', 4, '10:00:00', '21:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(9, '美樂地寵物沙龍', '台中市西區模範街35-2號', 4, '10:00:00', '19:30:00', 'Mon,Tue,Thu,Fri,Sat,Sun'),
(10, '多力寵物美容精品旅館', '台中市南屯區文心南二路398號', 4, '10:00:00', '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(11, '萊嘉寵物精品沙龍', '台中市西區大忠街36號', 4, '09:30:00', '19:00:00', 'Mon,Tue,Thu,Fri,Sat,Sun'),
(12, '瑋特貓狗SPA生活館', '台中市南屯區大墩十一街648號', 4, '10:00:00', '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun');

-- --------------------------------------------------------

--
-- 資料表結構 `beautyandbtag`
--

CREATE TABLE `beautyandbtag` (
  `beauty_id` int(11) NOT NULL,
  `btag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `beautyandbtag`
--

INSERT INTO `beautyandbtag` (`beauty_id`, `btag_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 1),
(2, 2),
(2, 3),
(2, 5),
(2, 6),
(3, 1),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(4, 1),
(4, 2),
(4, 3),
(4, 5),
(4, 6),
(5, 1),
(5, 4),
(5, 5),
(5, 6),
(6, 1),
(6, 4),
(6, 5),
(6, 6),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(8, 5),
(8, 6),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(9, 5),
(9, 6),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(10, 5),
(10, 6),
(11, 1),
(11, 2),
(11, 3),
(11, 5),
(11, 6),
(12, 1),
(12, 4),
(12, 5),
(12, 6);

-- --------------------------------------------------------

--
-- 資料表結構 `beautygroomer`
--

CREATE TABLE `beautygroomer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `beauty_id` int(11) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `seniority` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `beautygroomer`
--

INSERT INTO `beautygroomer` (`id`, `name`, `beauty_id`, `picture`, `animal_id`, `seniority`) VALUES
(1, '李嘉明', 1, '', 1, '資歷3年'),
(2, '王子涵', 1, '', 2, '資歷2年'),
(3, '張文傑', 1, '', 3, '資歷3年'),
(4, '劉志強', 2, '', 2, '資歷5年'),
(5, '陳美玲', 2, '', 1, '資歷3年'),
(6, '楊子楓', 3, '', 1, '資歷5年'),
(7, '趙家豪', 4, '', 3, '資歷3年'),
(8, '周雅婷', 5, '', 1, '資歷3年'),
(9, '吳俊輝', 5, '', 2, '資歷3年'),
(10, '鄭思琪', 6, '', 1, '資歷3年'),
(11, '馬曉楠', 6, '', 2, '資歷1年'),
(12, '孫文君', 7, '', 1, '資歷3年'),
(13, '何雅雯', 8, '', 1, '資歷5年'),
(14, '胡振華', 9, '', 1, '資歷4年'),
(15, '高子豪', 9, '', 2, '資歷3年'),
(16, '林雨薇', 10, '', 1, '資歷3年'),
(17, '謝凱文', 11, '', 1, '資歷3年'),
(18, '曹建華', 12, '', 1, '資歷2年'),
(19, '陸子嫻', 12, '', 2, '資歷5年'),
(20, '陶思源', 12, '', 3, '資歷2年');

-- --------------------------------------------------------

--
-- 資料表結構 `btag`
--

CREATE TABLE `btag` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `btag`
--

INSERT INTO `btag` (`id`, `name`) VALUES
(1, '直播'),
(2, '大型犬'),
(3, '小型犬'),
(4, '貓'),
(5, '小美容'),
(6, '大美容');

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
-- 資料表結構 `cartitems`
--

CREATE TABLE `cartitems` (
  `memberId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `cartQuantity` int(11) NOT NULL,
  `fhid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `clinic`
--

CREATE TABLE `clinic` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `location_id` int(11) NOT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `clinic`
--

INSERT INTO `clinic` (`id`, `name`, `address`, `location_id`, `startTime`, `endTime`, `day`) VALUES
(1, '基隆愛犬醫院', '基隆市中正區義一路188號', 7, '09:00:00', '21:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(2, '成安動物醫院', '基隆市中山區成功二路54號', 7, '09:00:00', '20:30:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(3, '大安動物醫院', '台北市中正區羅斯福路四段162號', 1, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(4, '展望急診動物醫院', '台北市萬華區中華路二段2號', 1, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(5, '全民動物醫院（民生總院）', '台北市大同區民生西路249號', 1, '10:00:00', '21:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(6, '慈愛動物醫院（台北總院）', '台北市大同區寧夏路1號', 1, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(7, '伊甸動物醫院', '台北市中山區北安路554巷33號', 1, '10:00:00', '21:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(8, '太僕動物醫院', '台北市中山區龍江路260號', 1, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(9, '南京太僕動物醫院', '台北市松山區南京東路五段286號', 1, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(10, '布達羊急診動物醫院', '台北市士林區忠誠路一段102號', 1, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(11, '阿牛犬貓急診醫院', '台北市士林區基河路238號', 1, '10:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(12, '大群動物醫院', '台北市文山區羅斯福路六段206號', 1, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(13, '全國動物醫院（台北分院）', '台北市內湖區舊宗路一段30巷13號', 1, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(14, '翔心動物醫院', '新北市板橋區忠孝路203號', 2, '10:00:00', '20:30:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(15, '來來動物醫院', '新北市中和區德光路29號', 2, '09:00:00', '21:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(16, '中日動物醫院', '新北市中和區中山路三段2號', 2, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(17, '來安動物醫院', '新北市新店區安康路二段115-1號', 2, '09:00:00', '22:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(18, '元氣動物醫院', '桃園市桃園區三民路三段381號', 3, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(19, '元氣動物醫院（藝文分院）', '桃園市桃園區莊敬路一段156號', 3, '09:00:00', '21:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(20, '品湛動物醫院', '桃園市桃園區民生路495-9號', 3, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(21, '磨鼻子動物醫院', '桃園市中壢區延平路20號', 3, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(22, '全國動物醫院（總院）', '台中市西區五權八街100號', 4, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(23, '康德急診動物醫院', '台中市北屯區崇德路二段270號', 4, '00:00:00', '24:00:00', 'Mon,Tue,Fri,Sat,Sun'),
(24, '格林威治動物醫院', '台中市南屯區文心路一段486號', 4, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(25, '慈愛動物醫院（台中總院）', '台中市大里區國光路二段539號	', 4, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(26, '成大動物醫院', '台中市清水區臨港路五段658巷27號', 4, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(27, '中華動物醫院', '台中市大甲區新政路2-2號', 4, '09:00:00', '21:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(28, '慈愛動物醫院（台南總院）', '台南市南區西門路一段473號', 5, '00:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(29, '全國動物醫院（永康分院）', '台南市永康區中華路103號2樓', 5, '10:30:00', '20:30:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(30, '諾亞動物醫院', '台南市中西區成功路297號', 5, '09:00:00', '22:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(31, '聯盟動物醫院（仁武總院）', '高雄市仁武區鳳仁路231號', 6, '09:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(32, '烏鐸動物醫院', '高雄市苓雅區中正一路139號', 6, '09:30:00', '21:30:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(33, '宏力動物醫院', '高雄市三民區明誠一路326號', 6, '08:00:00', '24:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'),
(34, '上海動物醫院', '花蓮市上海街63號', 18, '09:00:00', '21:00:00', 'Mon,Tue,Wed,Thu,Fri,Sun');

-- --------------------------------------------------------

--
-- 資料表結構 `clinicandctag`
--

CREATE TABLE `clinicandctag` (
  `clinic_id` int(11) NOT NULL,
  `ctag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `clinicandctag`
--

INSERT INTO `clinicandctag` (`clinic_id`, `ctag_id`) VALUES
(1, 2),
(1, 4),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(5, 2),
(5, 3),
(5, 4),
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(7, 2),
(7, 3),
(7, 4),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(9, 1),
(9, 2),
(9, 3),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(11, 2),
(11, 3),
(11, 4),
(12, 1),
(12, 2),
(12, 3),
(12, 4),
(13, 1),
(13, 2),
(13, 4),
(14, 2),
(14, 3),
(14, 4),
(15, 2),
(15, 3),
(15, 4),
(16, 1),
(16, 2),
(16, 3),
(16, 4),
(17, 2),
(17, 3),
(17, 4),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(19, 2),
(19, 3),
(19, 4),
(20, 1),
(20, 2),
(20, 3),
(20, 4),
(21, 1),
(21, 2),
(21, 3),
(21, 4),
(22, 1),
(22, 2),
(22, 3),
(22, 4),
(23, 1),
(23, 2),
(23, 3),
(23, 4),
(24, 1),
(24, 2),
(24, 3),
(24, 4),
(25, 1),
(25, 2),
(25, 3),
(25, 4),
(26, 1),
(26, 2),
(26, 3),
(26, 4),
(27, 2),
(27, 3),
(27, 4);

-- --------------------------------------------------------

--
-- 資料表結構 `clinicandsub`
--

CREATE TABLE `clinicandsub` (
  `clinic_id` int(11) NOT NULL,
  `sub_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `clinicandsub`
--

INSERT INTO `clinicandsub` (`clinic_id`, `sub_id`) VALUES
(1, 7),
(2, 2),
(2, 6),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(4, 1),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(5, 1),
(5, 2),
(5, 4),
(5, 5),
(5, 6),
(5, 7),
(6, 1),
(6, 2),
(6, 3),
(6, 5),
(6, 6),
(6, 7),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 6),
(7, 7),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(8, 5),
(8, 7),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(9, 5),
(9, 6),
(10, 2),
(10, 3),
(10, 4),
(10, 5),
(10, 6),
(10, 7),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(11, 5),
(11, 6),
(11, 7),
(12, 2),
(12, 3),
(12, 4),
(12, 5),
(12, 6),
(12, 7),
(13, 1),
(13, 2),
(13, 3),
(13, 4),
(13, 5),
(13, 6),
(13, 7);

-- --------------------------------------------------------

--
-- 資料表結構 `ctag`
--

CREATE TABLE `ctag` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `ctag`
--

INSERT INTO `ctag` (`id`, `name`) VALUES
(1, '24hr'),
(2, '犬'),
(3, '貓'),
(4, '疫苗');

-- --------------------------------------------------------

--
-- 資料表結構 `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `clinic_id` int(11) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `sub` varchar(255) DEFAULT NULL,
  `seniority` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `doctor`
--

INSERT INTO `doctor` (`id`, `name`, `clinic_id`, `picture`, `sub`, `seniority`, `info`) VALUES
(1, '李通文', 1, '', '神經內科專業', '資歷30年', '癲癇、腦炎、周圍神經病變'),
(2, '張志強', 2, '', '外科專業', '資歷40年', '絕育手術、剖腹產'),
(3, '李建國', 2, '', '牙科專業', '資歷5年', '口腔檢查'),
(4, '陳偉霖', 3, 'https://i.postimg.cc/mDFm3xsz/doctor-2-M.jpg', '心臟科專業', '資歷10年', '心臟病治療、心臟外科手術'),
(5, '黃志賢', 3, 'https://i.postimg.cc/wM800WqW/doctor-3-M.jpg', '骨科專業', '資歷13年', '骨癌、骨骼發育'),
(6, '楊麗萍', 3, 'https://i.postimg.cc/s2LnZjtC/doctor-1-F.jpg', '皮膚科專業', '資歷5年', '皮膚病、體內外驅蟲'),
(7, '何文彬', 4, 'https://www.rendrcare.com/wp-content/uploads/2021/09/JianWeiZhang_MD_W-800x800.jpg', '神經內科專業', '資歷15年', '針對退化性關節炎、脊髓損傷癱瘓'),
(8, '吳建中', 4, 'https://i.postimg.cc/mDFm3xsz/doctor-2-M.jpg', '骨科專業', '資歷7年', '骨骼神經、腹腔骨骼肌肉診斷'),
(9, '孫佳怡', 5, 'https://i.postimg.cc/x8vg7Kq9/doctor-4-F.jpg', '眼科專業', '資歷11年', '白內障、眼角膜修補、青光眼'),
(10, '周振宇', 5, 'https://i.postimg.cc/jqP8LrcB/doctor-5-M.jpg', '外科專業', '資歷6年', '絕育手術、剖腹產'),
(11, '馬俊傑', 5, 'https://i.postimg.cc/mDFm3xsz/doctor-2-M.jpg', '神經內科專業', '資歷30年', '癲癇、腦炎、周圍神經病變'),
(12, '鄭麗華', 6, 'https://i.postimg.cc/QxDf7nnC/doctor-6-F.jpg', '心臟科專業', '資歷15年', '心臟病治療、心臟外科手術'),
(13, '李建國', 6, 'https://i.postimg.cc/mDFm3xsz/doctor-2-M.jpg', '牙科', '資歷7年', '口腔檢查'),
(14, '張志強', 7, 'https://i.postimg.cc/wM800WqW/doctor-3-M.jpg', '眼科', '資歷12年', '白內障、眼角膜修補、青光眼'),
(15, '王小明', 7, 'https://i.postimg.cc/jqP8LrcB/doctor-5-M.jpg', '皮膚科', '資歷22年', '皮膚病、體內外驅蟲'),
(16, '陳偉霖', 8, 'https://i.postimg.cc/mDFm3xsz/doctor-2-M.jpg', '骨科', '資歷10年', '骨骼神經、腹腔骨骼肌肉診斷'),
(17, '劉德華', 8, 'https://i.postimg.cc/wM800WqW/doctor-3-M.jpg', '外科', '資歷30年', '絕育手術、剖腹產'),
(18, '黃志賢', 9, 'https://i.postimg.cc/jqP8LrcB/doctor-5-M.jpg', '神經內科', '資歷9年', '癲癇、腦炎、周圍神經病變'),
(19, '楊麗萍', 9, 'https://i.postimg.cc/s2LnZjtC/doctor-1-F.jpg', '心臟科', '資歷25年', '心臟病治療、心臟外科手術'),
(20, '何文彬', 10, 'https://i.postimg.cc/mDFm3xsz/doctor-2-M.jpg', '牙科', '資歷8年', '口腔檢查'),
(21, '吳建中', 10, 'https://i.postimg.cc/wM800WqW/doctor-3-M.jpg', '眼科', '資歷14年', '白內障、眼角膜修補、青光眼'),
(22, '趙子龍', 11, 'https://i.postimg.cc/jqP8LrcB/doctor-5-M.jpg', '皮膚科', '資歷5年', '皮膚病、體內外驅蟲'),
(23, '孫佳怡', 11, 'https://i.postimg.cc/x8vg7Kq9/doctor-4-F.jpg', '骨科', '資歷20年', '骨骼神經、腹腔骨骼肌肉診斷'),
(24, '周振宇', 12, 'https://i.postimg.cc/mDFm3xsz/doctor-2-M.jpg', '外科', '資歷18年', '絕育手術、剖腹產'),
(25, '馬俊傑', 12, 'https://i.postimg.cc/wM800WqW/doctor-3-M.jpg', '神經內科', '資歷35年', '癲癇、腦炎、周圍神經病變'),
(26, '鄭麗華', 13, 'https://i.postimg.cc/QxDf7nnC/doctor-6-F.jpg', '心臟科', '資歷23年', '心臟病治療、心臟外科手術'),
(27, '蔡明德', 13, 'https://i.postimg.cc/mDFm3xsz/doctor-2-M.jpg', '牙科', '資歷6年', '口腔檢查'),
(28, '吳雨涵', 14, '', '眼科', '資歷19年', '白內障、眼角膜修補、青光眼'),
(29, '許志成', 14, '', '皮膚科', '資歷21年', '皮膚病、體內外驅蟲'),
(30, '梁建華', 15, '', '骨科', '資歷24年', '骨癌、骨骼發育'),
(31, '高俊偉', 15, '', '外科', '資歷15年', '絕育手術、剖腹產'),
(32, '韓冰冰', 16, '', '神經內科', '資歷2年', '癲癇、腦炎、周圍神經病變'),
(33, '蘇志豪', 16, '', '心臟科', '資歷17年', '心臟病治療、心臟外科手術'),
(34, '曾國城', 17, '', '牙科', '資歷1年', '口腔檢查'),
(35, '陶晶瑩', 17, '', '眼科', '資歷11年', '白內障、眼角膜修補、青光眼'),
(36, '彭于晏', 18, '', '皮膚科', '資歷13年', '皮膚病、體內外驅蟲'),
(37, '任達華', 18, '', '骨科', '資歷31年', '骨癌、骨骼發育'),
(38, '戴立忍', 19, '', '外科', '資歷16年', '絕育手術、剖腹產'),
(39, '柯震東', 19, '', '神經內科', '資歷36年', '針對退化性關節炎、脊髓損傷癱瘓'),
(40, '傅佩慈', 20, '', '心臟科', '資歷27年', '心臟病治療、心臟外科手術'),
(41, '丁曉雨', 20, '', '牙科', '資歷3年', '口腔檢查'),
(42, '謝霆鋒', 21, '', '眼科', '資歷4年', '白內障、眼角膜修補、青光眼'),
(43, '李建國', 21, '', '皮膚科', '資歷29年', '皮膚病、體內外驅蟲'),
(44, '張志強', 22, '', '骨科', '資歷28年', '骨癌、骨骼發育'),
(45, '王小明', 22, '', '外科', '資歷39年', '絕育手術、剖腹產'),
(46, '陳偉霖', 23, '', '神經內科', '資歷32年', '針對退化性關節炎、脊髓損傷癱瘓'),
(47, '劉德華', 23, '', '心臟科', '資歷26年', '心臟病治療、心臟外科手術'),
(48, '黃志賢', 24, '', '牙科', '資歷38年', '口腔檢查'),
(49, '楊麗萍', 24, '', '眼科', '資歷34年', '白內障、眼角膜修補、青光眼'),
(50, '何文彬', 25, '', '皮膚科', '資歷33年', '皮膚病、體內外驅蟲'),
(51, '吳建中', 25, '', '骨科', '資歷37年', '骨癌、骨骼發育'),
(52, '趙子龍', 26, '', '外科', '資歷40年', '絕育手術、剖腹產'),
(53, '孫佳怡', 26, '', '神經內科', '資歷3年', '針對退化性關節炎、脊髓損傷癱瘓'),
(54, '周振宇', 27, '', '心臟科', '資歷2年', '心臟病治療、心臟外科手術'),
(55, '馬俊傑', 27, '', '牙科', '資歷7年', '口腔檢查'),
(56, '鄭麗華', 28, '', '眼科', '資歷9年', '白內障、眼角膜修補、青光眼'),
(57, '蔡明德', 28, '', '皮膚科', '資歷14年', '皮膚病、體內外驅蟲'),
(58, '吳雨涵', 29, '', '骨科', '資歷6年', '骨癌、骨骼發育'),
(59, '許志成', 29, '', '外科', '資歷5年', '絕育手術、剖腹產'),
(60, '梁建華', 30, '', '神經內科', '資歷20年', '癲癇、腦炎、周圍神經病變'),
(61, '高俊偉', 30, '', '心臟科', '資歷12年', '心臟病治療、心臟外科手術'),
(62, '韓冰冰', 31, '', '牙科', '資歷25年', '口腔檢查');

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
-- 資料表結構 `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `location`
--

INSERT INTO `location` (`id`, `name`) VALUES
(1, '臺北市'),
(2, '新北市'),
(3, '桃園市'),
(4, '臺中市'),
(5, '臺南市'),
(6, '高雄市'),
(7, '基隆市'),
(8, '新竹市'),
(9, '嘉義市'),
(10, '新竹縣'),
(11, '苗栗縣'),
(12, '彰化縣'),
(13, '南投縣'),
(14, '雲林縣'),
(15, '嘉義縣'),
(16, '屏東縣'),
(17, '宜蘭縣'),
(18, '花蓮縣'),
(19, '臺東縣'),
(20, '澎湖縣'),
(21, '金門縣'),
(22, '馬祖縣');

-- --------------------------------------------------------

--
-- 資料表結構 `members`
--

CREATE TABLE `members` (
  `memberId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `members`
--

INSERT INTO `members` (`memberId`, `userName`, `email`, `password`) VALUES
(1, 'Eric', 'h123@gmail.com', '123456'),
(2, 'Andy', 'test@gmail.com', '123456');

-- --------------------------------------------------------

--
-- 資料表結構 `night`
--

CREATE TABLE `night` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `night`
--

INSERT INTO `night` (`id`, `name`, `address`, `location_id`, `day`, `service`, `info`) VALUES
(1, 'W SPA寵物旅館', '台北市中正區羅斯福路三段139號1F', 1, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', '24H監視器、狗狗不關籠半開照料、貓咪獨立挑高空間', 'W SPA 寵物旅館，成立於2013年為專業寵物旅館，近台北市大安區台電大樓捷運旁，設備採用頂級寵物SPA磁化能量高氧牛奶浴機，嚴格酒精消毒．殺菌 清潔、日本日立頂級變頻冷暖氣機(多重清淨，抗敏 抑菌.3D立體氣流，均勻吹送)、阿拉斯加全熱交換器、貓咪專屬獨立超大挑高空間透明玻璃屋，讓小寶貝們來到我們W SPA寵物旅館，高檔享受最頂級環境設備和專業服務。'),
(2, 'VERY旺寵物旅館', '台北市松山區八德路二段429號2樓', 1, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', '貓狗獨立分層空間、頂樓戶外運動場', 'VERY旺以打造市中心的寵物樂園為出發點，提供貓狗美容、 SPA 、住宿、安親臨托等，也有販售寵物用品及鮮食，旅館除了採貓狗獨立分層空間外，最大特色就是頂樓有設計戶外運動場，能讓住宿的狗狗自由自在奔跑玩耍。'),
(3, '家裡寵物旅館-幼幼館', '台北市中山區長安東路二段195號1樓', 1, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', '幼犬、小型犬寄宿', '家裡寵物旅館是全台唯一專門收幼犬的寵物旅館，主打為幼犬、小型犬提供寄宿、安親、美容、訓練等服務，環境相當溫馨自由，尤其在遊戲安親班的活動，更是採一對一引導，而不是團體一起玩，這樣才能避免寵物之間產生護食引起衝突，從細節可見其用心。'),
(4, '狗窩窩愛犬旅社', '台北市松山區民生東路五段137巷2-5號', 1, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', '狗狗不關籠寄宿', '狗窩窩愛犬旅社希望所有毛小孩來到這裡，能可以像「在家」一般，這是狗窩窩的理念，主要提供美容、住宿、安親等服務，並採不關籠的寄宿方式，讓每個毛孩都有自己的小房間可以睡覺，且保姆也都是經驗豐富的狗奴才，飼主再也不怕狗狗寄宿受委屈！'),
(5, '好時光寵物旅館', '台北市內湖區民權東路六段170號1F', 1, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', '寵物獨立住宿空間', '鄰近內湖四期重劃住宅區的好時光寵物旅館，會依照毛小孩的體型、個性分區照顧，每天還有帶去公園散步、放風的戶外活動時間，甚至連睡覺都是一隻一間獨立空間，讓毛小孩休息不會互相影響。另外，寵物住宿也都備有攝影機，讓飼主可遠端連線觀看！'),
(6, '旺憂寵物 WANTU', '台中市南屯區東興路二段265號', 4, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', '24hr遠端監控、專屬保姆陪玩', '旺憂寵物 WANTU 位於南屯東興路二段，寵物店一樓提供寵物用品和美容服務，二樓是寵物住宿區，三樓是專屬毛孩放電的場所。店家門口有三個停車位，並提供專車接送服務。'),
(7, 'Wen溫斯頓寵物生活館', '台中市北屯區熱河路三段91巷1號', 4, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', '24hr監視器、狗狗獨立式套房、每天三次放風', 'Wen 溫斯頓寵物生活館位在北屯區崇德商圈附近住宅區內，童趣的別墅外觀像座小城堡，門口可停 2 部汽車。小小的前院有著安全防護柵欄避免毛孩們逃脫，玻璃大門也需要透過內部操作才能開啟，狗寶貝的安全令人放心。店面旁有一座草皮放風區，是專門給在這住宿狗狗上廁所和放風跑跳的地方。');

-- --------------------------------------------------------

--
-- 資料表結構 `nightandntag`
--

CREATE TABLE `nightandntag` (
  `night_id` int(11) NOT NULL,
  `ntag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `nightandntag`
--

INSERT INTO `nightandntag` (`night_id`, `ntag_id`) VALUES
(1, 1),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(5, 1),
(5, 2),
(5, 3),
(5, 5),
(6, 1),
(6, 2),
(6, 3),
(6, 5),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5);

-- --------------------------------------------------------

--
-- 資料表結構 `ntag`
--

CREATE TABLE `ntag` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `ntag`
--

INSERT INTO `ntag` (`id`, `name`) VALUES
(1, '推薦'),
(2, '大型犬'),
(3, '小型犬'),
(4, '貓'),
(5, '直播'),
(1, '推薦'),
(2, '大型犬'),
(3, '小型犬'),
(4, '貓'),
(5, '直播');

-- --------------------------------------------------------

--
-- 資料表結構 `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(10) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `orderQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `totalPrice` int(10) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `pets`
--

INSERT INTO `pets` (`id`, `breed`, `size`, `birthdate`, `weight`, `length`, `user_id`) VALUES
(1, '短毛', '中型', '1998-07-27', 100, 200, 1),
(2, '三花', '中型', '0000-00-00', 100, 200, 2);

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
(1, 1),
(1, 3),
(1, 13),
(2, 1),
(2, 3),
(2, 13),
(3, 5),
(3, 12),
(3, 14),
(4, 5),
(4, 12),
(4, 14),
(5, 5),
(5, 12),
(5, 14),
(6, 5),
(6, 12),
(6, 14),
(7, 5),
(7, 12),
(7, 14),
(8, 3),
(8, 13),
(8, 14),
(9, 3),
(9, 13),
(9, 14),
(10, 8),
(10, 13),
(10, 14),
(11, 3),
(11, 7),
(11, 14),
(12, 3),
(12, 10),
(12, 14),
(13, 9),
(13, 11),
(13, 16),
(14, 9),
(14, 11),
(14, 16),
(15, 9),
(15, 11),
(15, 16),
(16, 9),
(16, 11),
(16, 16),
(17, 3),
(17, 11),
(17, 20),
(18, 3),
(18, 11),
(18, 20),
(19, 3),
(19, 11),
(19, 20),
(20, 11),
(20, 12),
(20, 16),
(21, 12),
(21, 14),
(21, 19),
(22, 16),
(22, 17),
(22, 19),
(23, 16),
(23, 17),
(23, 19),
(24, 16),
(24, 17),
(24, 19),
(25, 16),
(25, 19),
(25, 20),
(26, 16),
(26, 19),
(26, 20);

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
(15, '鮮雞4蔬'),
(16, '黑酵母'),
(17, '藥食菇'),
(18, '免疫健康'),
(19, '超級保健'),
(20, '免疫健康'),
(21, '綜合營養'),
(22, '海藻粉'),
(23, '蔓越莓'),
(24, '南瓜嫩雞'),
(25, '山藥嫩雞');

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
(1, '《美喵人生 O\'KAT》冷凍乾燥生肉糧｜貓冷凍脫水乾糧', 1, 1, 1, 'https://i.postimg.cc/zfSgdJnz/O-KAT.jpg', '■  高含肉量：95.5%含肉量，優質蛋白質鮪魚、雞肉、雞肝，雞心。\r\n■  營養加倍：添加德國家醫貓王生食營養粉3％，補充維生素、礦物質、牛磺酸。\r\n■  優質保證：台灣製造經全國公證食品檢驗，符合AAFCO貓糧營養均衡標準。\r\n■  冷凍乾燥：保持食材完整營養，無麩質、無穀類、無玉米。\r\n\r\n【規格】\r\n■ 容量：70g / 300g\r\n■ 產地：台灣（添加德國家醫 貓王生食必須營養粉）\r\n■ 適用對象：貓', NULL, 200, 0.8, 10),
(2, '《美喵人生 O\'KAT》冷凍乾燥生肉糧｜貓冷凍脫水乾糧', 1, 2, 1, 'https://i.postimg.cc/1XWTDhWM/O-KAT.jpg', '■  高含肉量：95.7%含肉量，優質蛋白質雞肉、雞肝，雞心。\r\n■  營養加倍：添加德國家醫貓王生食營養粉3％，補充維生素、礦物質、牛磺酸。\r\n■  優質保證：台灣製造經全國公證食品檢驗，符合AAFCO貓糧營養均衡標準。\r\n■  冷凍乾燥：保持食材完整營養，無麩質、無穀類、無玉米。\r\n\r\n【規格】\r\n■ 容量：70g / 300g\r\n■ 產地：台灣', NULL, 200, 0.85, 110),
(3, '《野起來吃 Wild Feeding》犬貓冷凍生食300g｜冷凍配送', 2, 3, 2, 'https://i.postimg.cc/X7BFTN6L/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n\r\n【規格】\r\n■ 重量：300g \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.9, 100),
(4, '《野起來吃 Wild Feeding》犬貓冷凍生食300g｜冷凍配送', 2, 4, 2, 'https://i.postimg.cc/J0kndnHB/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n■ 阿拉斯加野生鮭魚，因為吃的是野生的小魚、小蝦，富含 Omega --不飽和脂肪酸，生長在無汙染海域。對比之下，養殖的挪威鮭魚與智利鮭魚因為吃的是飼料，所含 Omega-3 極少，也沒有殺蟲劑與乙氧䤆污染的問題。 \r\n\r\n【規格】 \r\n■ 重量：300g\r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 150, 1, 100),
(5, '《野起來吃 Wild Feeding》犬貓冷凍生食300g｜冷凍配送', 2, 5, 2, 'https://i.postimg.cc/3R6NBpNT/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n\r\n【規格】 \r\n■ 重量：300g \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.8, 100),
(6, '《野起來吃 Wild Feeding》犬貓冷凍生食300g｜冷凍配送', 2, 6, 2, 'https://i.postimg.cc/4xbKgmL6/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n\r\n【規格】\r\n■ 重量：300g \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.8, 100),
(7, '《野起來吃 Wild Feeding》犬貓冷凍生食300g｜冷凍配送', 2, 7, 2, 'https://i.postimg.cc/pyMTNHKc/Wild-Feeding-300g.jpg', '■ 野起來吃專為毛小孩設計的頂級生食餐。利用高壓滅菌、殺蟲，安心又營養。營養成分皆符合美國飼料管理協會（AAFCO）。 \r\n■ 雲林號稱「養鵝王國」，台灣鵝產量一半來自雲林，雲林鵝肉富含豐富蛋白質、脂肪、鈣、磷、鐵、錳、維生素（A、B、C），是理想的高蛋白、低脂肪、低膽固醇的肉品，不僅脂肪含量低，而且品質好，不飽和脂肪酸的含量高，也是離胺酸相對精胺酸較高的肉品。\r\n\r\n【規格】\r\n■ 重量：300g \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.8, 100),
(8, '《天然密碼》皮膚毛髮保健｜無穀配方｜貓顆粒乾糧', 3, 8, 3, 'https://i.postimg.cc/RV0tTQ2b/image.jpg', '■ 添加10種功能性天然綜合超級食材。\r\n■ 87%動物性蛋白，0%穀物麩質、動物副產品。\r\n■ 添加益生菌及益菌生，呵護腸道幫助消化。\r\n■ 支持泌尿系統健康，幫助控制毛球。\r\n■ 鮭魚：不飽和脂肪酸，幫助貓咪皮膚及毛髮健康\r\n■ 鯡魚：富含牛磺酸，維持心血管、眼睛健康及維持自然抵抗力。\r\n■ 曼哈頓魚：含豐富的多元脂肪酸，幫助保護皮膚屏障\r\n■ 適合全年齡貓咪，提供完整的營養及豐富維生素與礦物質。\r\n\r\n【規格】 \r\n■ 重量：227g / 1.1kg / 5kg\r\n■ 產地：美國\r\n■ 適用對象：貓', NULL, 200, 0.8, 100),
(9, '《天然密碼》皮膚毛髮保健｜無穀配方｜貓顆粒乾糧', 3, 9, 3, 'https://i.postimg.cc/J4jcd3XK/image.jpg', '■ 添加10種功能性天然綜合超級食材。\r\n■ 87%動物性蛋白，0%穀物麩質、動物副產品。\r\n■ 添加益生菌及益菌生，呵護腸道幫助消化。\r\n■ 支持泌尿系統健康，幫助控制毛球。\r\n■ 鮭魚：不飽和脂肪酸，幫助貓咪皮膚及毛髮健康\r\n■ 鯡魚：富含牛磺酸，維持心血管、眼睛健康及維持自然抵抗力。\r\n■ 曼哈頓魚：含豐富的多元脂肪酸，幫助保護皮膚屏障\r\n■ 適合全年齡貓咪，提供完整的營養及豐富維生素與礦物質。\r\n\r\n【規格】 \r\n■ 重量：227g / 1.1kg / 5kg\r\n■ 產地：美國\r\n■ 適用對象：貓', NULL, 250, 0.8, 100),
(10, '《天然密碼》皮膚毛髮保健｜無穀配方｜貓顆粒乾糧', 3, 2, 3, 'https://i.postimg.cc/WzYw798T/image.jpg', '■ 添加10種功能性天然綜合超級食材。\r\n■ 89%動物性蛋白，0%穀物麩質、動物副產品。\r\n■ 添加益生菌及益菌生，呵護腸道幫助消化。\r\n■ 支持泌尿系統健康，幫助控制毛球。\r\n■ 雞肉：優質蛋白質，消化率高達92%。\r\n■ 鯡魚：富含牛磺酸，維持心血管、眼睛健康及維持自然抵抗力。\r\n■ 火雞肉：瘦肉蛋白質來源，適合腸胃敏感的貓咪。\r\n■ 適合幼貓及高活動量的貓咪，提供完整的營養及豐富維生素與礦物質。\r\n\r\n【規格】 \r\n■ 重量：227g / 1.1kg / 5kg\r\n■ 產地：美國\r\n■ 適用對象：貓', NULL, 220, 0.8, 100),
(11, '《wanwan》｜無穀高齡貓關節護理配方｜貓顆粒乾糧', 4, 2, 6, 'https://i.postimg.cc/Ls8tXrb0/BOREAL.jpg', '■ 調整蛋白質、脂肪和纖維含量：適合熟齡貓或室內貓，照顧貓咪整體健康。\r\n■ 低升糖指數飲食：延長飽足感，減少血糖高峰，有助於控制血糖穩定。\r\n■ 獨家鋅專利礦物質配方：提供全方位的代謝和免疫支持。\r\n■ 含豐富消化酵素、益生菌和保健草本食材：照顧貓咪腸道健康。\r\n\r\n【規格】\r\n■ 重量：5LB（2.26kg）／12LB（5.44kg）\r\n■ 產地：加拿大\r\n■ 適用對象：貓', NULL, 300, 0.8, 100),
(12, '《wanwan》｜無穀高齡貓關節護理配方｜貓顆粒乾糧', 4, 3, 6, 'https://i.postimg.cc/6pwLs7LK/BOREAL.jpg', '■ 調整蛋白質、脂肪和纖維含量：適合熟齡或室內貓，有助於體重控制。\r\n■ 高纖維、低脂肪配方：維護貓咪健康體態，有助於控制體重。\r\n■ 低升糖指數飲食：有助於維持貓咪健康血糖。\r\n■ 獨家鋅專利礦物質配方：提供全方位的代謝和免疫支持。\r\n■ 含豐富消化酵素、益生菌和保健草本食材：照顧貓咪腸道健康。\r\n\r\n【規格】\r\n■ 重量：5LB（2.26kg）／12LB（5.44kg）\r\n■ 產地：加拿大\r\n■ 適用對象：貓', NULL, 300, 0.8, 100),
(13, '愛普士 Applaws全天然犬罐156g狗副食罐', 5, 2, 5, 'https://i.postimg.cc/1zvcxkLq/Applaws-156g.jpg', '■ 熱量：66kcal／100g \r\n\r\n■ 愛普士全天然犬罐所用之食材為特選有機飼料飼養之雞隻，均不施打抗生素及賀爾蒙以及天然海域中最上等之魚肉。 \r\n\r\n【規格】 \r\n■ 重量：156g\r\n■ 產地：泰國 \r\n■ 適用對象：狗', NULL, 160, 1, 100),
(14, '愛普士 Applaws全天然犬罐156g狗副食罐', 5, 10, 5, 'https://i.postimg.cc/50j5fPVk/Applaws-156g.jpg', '■ 熱量：57kcal／100g \r\n\r\n■ 愛普士全天然犬罐所用之食材為特選有機飼料飼養之雞隻，均不施打抗生素及賀爾蒙以及天然海域中最上等之魚肉。 \r\n\r\n【規格】 \r\n■ 重量：156g\r\n■ 產地：泰國 \r\n■ 適用對象：狗', NULL, 160, 1, 100),
(15, '愛普士 Applaws全天然犬罐156g狗副食罐', 5, 11, 5, 'https://i.postimg.cc/CKhHQh60/Applaws-156g.jpg', '■ 熱量：75kcal／100g\r\n\r\n■ 愛普士全天然犬罐所用之食材為特選有機飼料飼養之雞隻，均不施打抗生素及賀爾蒙以及天然海域中最上等之魚肉。 \r\n\r\n【規格】 \r\n■ 重量：156g\r\n■ 產地：泰國 \r\n■ 適用對象：狗', NULL, 160, 1, 100),
(16, '愛普士 Applaws全天然犬罐156g狗副食罐', 5, 12, 5, 'https://i.postimg.cc/HL0SKv2G/Applaws-156g.jpg', '■ 熱量：57kcal／100g \r\n\r\n■ 愛普士全天然犬罐所用之食材為特選有機飼料飼養之雞隻，均不施打抗生素及賀爾蒙以及天然海域中最上等之魚肉。 \r\n\r\n【規格】 \r\n■ 重量：156g\r\n■ 產地：泰國 \r\n■ 適用對象：狗', NULL, 160, 1, 100),
(17, '《wanwan》注文時刻犬用營養餐包80g｜狗副食罐', 6, 13, 6, 'https://i.postimg.cc/nzmsdqkW/wanwan-80g.jpg', '■ 旨在讓狗狗也能品嚐到道地的和風滋味。\r\n■ 嚴選多種特色日式料理的食材，將其精華完美鎖進餐包中，並配合狗狗的每日營養需求進行調整，是兼顧營養和美味的高級犬用濕糧。\r\n■ 滿滿的雞肉與雞高湯滿足狗狗口腹。 \r\n■ 青汁有豐富的蔬果，讓狗狗能攝取維生素。 \r\n■ 天然無穀、無麩質。 \r\n■ 成分簡單能避開已知過敏原。 \r\n■ 日本原裝製作進口。 \r\n\r\n【規格】 \r\n■ 容量：80g \r\n■ 產地：日本\r\n■ 適用對象：狗', NULL, 210, 1, 100),
(18, '《wanwan》注文時刻犬用營養餐包80g｜狗副食罐', 6, 14, 6, 'https://i.postimg.cc/gkwLTF25/wanwan-80g.jpg', '■ 旨在讓狗狗也能品嚐到道地的和風滋味。\r\n■ 嚴選多種特色日式料理的食材，將其精華完美鎖進餐包中，並配合狗狗的每日營養需求進行調整，是兼顧營養和美味的高級犬用濕糧。\r\n■ 雞肉口味餐包滿足狗狗口腹。 \r\n■ 天然無穀、無麩質。 \r\n■ 成分簡單能避開已知過敏原。 \r\n■ 日本原裝製作進口。 ', NULL, 210, 1, 100),
(19, '《wanwan》注文時刻犬用營養餐包80g｜狗副食罐', 6, 15, 6, 'https://i.postimg.cc/2511gmJm/wanwan-80g-4.jpg', '■ 滿滿的雞肉與雞高湯滿足狗狗口腹。 \r\n■ 豐富的蔬果，讓狗狗能攝取維生素。 \r\n■ 天然無穀、無麩質。 \r\n■ 成分簡單能避開已知過敏原。 \r\n■ 日本原裝製作進口。 \r\n\r\n【規格】 \r\n■ 容量：80g \r\n■ 產地：日本 \r\n■ 適用對象：狗', NULL, 210, 1, 100),
(20, '《wanwan》黑酵母75ml｜犬用｜寵物營養口服液', 7, 16, 6, 'https://i.postimg.cc/mDMt2jB5/Aureo-75ml.jpg', '■ 日本原裝進口：GMP認證自家工廠生產。\r\n■ 多國專利認證：榮獲51項專利，證明效果與安全性。\r\n■ 富含β-Glucan：維持寵物免疫力。\r\n■ EF乳酸菌：調整腸道菌叢生態，維持腸道健康。\r\n■ 100%純天然無添加：凝膠狀易吞嚥好吸收\r\n\r\n【規格】\r\n■ 容量：75ml（5ml x 15包）\r\n■ 注意事項：\r\n■ 產地：日本\r\n■ 適用對象：狗', NULL, 200, 1, 100),
(21, '《wanwan》菇菌特攻隊菇蕈粉70g｜藥食菇蕈系列', 8, 17, 6, 'https://i.postimg.cc/wTj2kzv7/Animal-Essentials-70g.jpg', '■ 全方位健康支持：專為毛孩提供全面營養。\r\n■ 消化道腸胃保健：獨特配方維護腸胃健康，幫助消化。\r\n■ 維持免疫力：維持身體抵抗力。\r\n■ 100% 菇蕈高濃度配方：採用高濃度菇蕈，確保營養成分的豐富。\r\n \r\n【規格】\r\n■ 容量：70g\r\n■ 產地：美國 \r\n■ 適用對象：狗／貓', NULL, 300, 1, 100),
(22, '《wanwan》免疫健康60g｜熱激活保健系列', 9, 18, 6, 'https://i.postimg.cc/3rXdstLy/bare-good-60g.jpg', '■ 專利熱激活敏感複合乳酸菌LP28 & M1，維持自然免疫力與抵抗力。\r\n■ 滋補強身，全方支持整體健康。\r\n\r\n【規格】\r\n■ 容量：60g\r\n■ 建議攝取量：5公斤每日食用1克以此類推。\r\n■ 餵食方式：將粉末灑在寵物飼料或食物即可。\r\n■ 注意事項：魚骨鈣及牛初乳粉在噴粉過程會產生淡黃色或咖啡色的焦化小顆粒，為正常現象，請安心食用。\r\n■ 產地：台灣\r\n■ 適用對象：狗／貓', NULL, 300, 0.8, 100),
(23, '《wanwan》每日超級保健55顆', 10, 19, 6, 'https://i.postimg.cc/63spSZnL/GO-VITA-55.jpg', '■ 四種超級食物組合，每日必須的全面營養保健。\r\n■ 維他命C加乘吸收，增加寵物自然抵抗力。\r\n■ 有助維持呼吸道和泌尿道的整體健康。\r\n■ 蔓越莓提供抗氧化效果，讓毛孩健康無憂。\r\n■ 方便餵食方式，膠囊粉末可混入食物中，簡單又方便。\r\n\r\n【規格】\r\n■ 容量：55 顆 \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.8, 100),
(24, '《wanwan》免疫健康55顆', 10, 19, 6, 'https://i.postimg.cc/tgng2kZ4/GO-VITA-55.jpg', '■ 融合EpiCor®專利酵母和韓國專利發酵紅蔘，提供全方位營養補充。\r\n■ EpiCor®專利酵母含有維生素、礦物質、胺基酸和抗氧化物，具有抗氧化作用。\r\n■ 韓國專利發酵紅蔘滋補強身，提供寵物所需的營養。\r\n■ 增強寵物自然抵抗力，維護健康狀態。\r\n■ 方便易用的膠囊餵食方式，讓寵物每天都能輕鬆享受健康生活。\r\n\r\n【規格】\r\n■ 容量：55 顆 \r\n■ 產地：台灣 \r\n■ 適用對象：狗／貓', NULL, 200, 0.8, 0),
(25, '《wanwan》無敵菇蕈王NATURES IMMUNO 100ml', 11, 17, 6, 'https://i.postimg.cc/x8nTjSsX/NHV-NATURES-IMMUNO-100ml.jpg', '■ 多種藥食菇菌配方：抗氧化複合配方有助於抵抗自由基對身體的傷害，滋補強身維持活力，維持整體健康。\r\n■ 純度精準植物萃取：高品質廣譜植物萃取，保證純淨成分。\r\n■ 25年專業經驗：獸醫+藥草學家研製配方，100%天然成分。\r\n■ 獨家營養配方：根據犬貓特性和營養需求，守護毛孩健康飲食。\r\n\r\n【規格】\r\n■ 容量：100ml \r\n■ 產地：加拿大 \r\n■ 適用對象：狗／貓', NULL, 300, 1, 100),
(26, '《wanwan》綜合營養飲MULTI ESSENTIALS 100ml', 11, 21, 6, 'https://i.postimg.cc/4yP4mFMB/NHV-MULTI-ESSENTIALS-100ml.jpg', '■ 植物營養補充：以植物為基底的綜合營養素，提供完整均衡營養，滋補強身。\r\n■ 廣譜植物萃取，純度精準：天然植物成分，營養補充不含雜質。\r\n■ 25年專業經驗：獸醫+藥草學家研製，安心選擇。\r\n■ 100%天然配方：無人工色素、防腐劑和輻射汙染，寵物健康首選。\r\n\r\n【規格】\r\n■ 容量：100ml \r\n■ 產地：加拿大 \r\n■ 適用對象：狗／貓', NULL, 200, 1, 100);

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
(14, '成貓'),
(15, '無抗生素'),
(16, '100%天然'),
(17, '添加維他命'),
(18, '眼睛保健'),
(19, '維持活動力'),
(20, '滋補強身');

-- --------------------------------------------------------

--
-- 資料表結構 `sub`
--

CREATE TABLE `sub` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `sub`
--

INSERT INTO `sub` (`id`, `name`) VALUES
(1, '心臟科'),
(2, '牙科'),
(3, '眼科'),
(4, '皮膚科'),
(5, '骨科'),
(6, '外科'),
(7, '神經內科'),
(1, '心臟科'),
(2, '牙科'),
(3, '眼科'),
(4, '皮膚科'),
(5, '骨科'),
(6, '外科'),
(7, '神經內科');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`) VALUES
(1, 'willy', '$2a$10$T9l7R9RAxBn434RWAnVWOuNLXg8sTNdgXlFnTpUdCdLdVyEYU3smy', 'd1064182032@gm.lhu.edu.tw', '0912345678'),
(2, 'john', '$2a$10$UbdzAmhn5gp0Rh6Q3vV2jOEOe9dKz48aXQ8vpaiZS/I.LFar6e4ri', '123@gmail.com', '0912345678');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `beauty`
--
ALTER TABLE `beauty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- 資料表索引 `beautyandbtag`
--
ALTER TABLE `beautyandbtag`
  ADD PRIMARY KEY (`beauty_id`,`btag_id`),
  ADD KEY `btag_id` (`btag_id`);

--
-- 資料表索引 `beautygroomer`
--
ALTER TABLE `beautygroomer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `beauty_id` (`beauty_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- 資料表索引 `btag`
--
ALTER TABLE `btag`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `carouselevent`
--
ALTER TABLE `carouselevent`
  ADD PRIMARY KEY (`EventId`);

--
-- 資料表索引 `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`memberId`,`productId`,`fhid`),
  ADD KEY `productId` (`productId`),
  ADD KEY `memberId` (`memberId`);

--
-- 資料表索引 `clinic`
--
ALTER TABLE `clinic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_location` (`location_id`);

--
-- 資料表索引 `clinicandctag`
--
ALTER TABLE `clinicandctag`
  ADD PRIMARY KEY (`clinic_id`,`ctag_id`),
  ADD KEY `ctag_id` (`ctag_id`);

--
-- 資料表索引 `clinicandsub`
--
ALTER TABLE `clinicandsub`
  ADD PRIMARY KEY (`clinic_id`,`sub_id`),
  ADD KEY `sub_id` (`sub_id`);

--
-- 資料表索引 `ctag`
--
ALTER TABLE `ctag`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clinic_id` (`clinic_id`);

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
-- 資料表索引 `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`memberId`);

--
-- 資料表索引 `night`
--
ALTER TABLE `night`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- 資料表索引 `nightandntag`
--
ALTER TABLE `nightandntag`
  ADD PRIMARY KEY (`night_id`,`ntag_id`),
  ADD KEY `ntag_id` (`ntag_id`);

--
-- 資料表索引 `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `orderId` (`orderId`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `memberId` (`memberId`);

--
-- 資料表索引 `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

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
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `eyesearsmouth`
--
ALTER TABLE `eyesearsmouth`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `members`
--
ALTER TABLE `members`
  MODIFY `memberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `productshop`
--
ALTER TABLE `productshop`
  MODIFY `productId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `members` (`memberId`),
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `productshop` (`productId`);

--
-- 資料表的限制式 `heal`
--
ALTER TABLE `heal`
  ADD CONSTRAINT `heal_ibfk_1` FOREIGN KEY (`hid`) REFERENCES `eyesearsmouth` (`hid`);

--
-- 資料表的限制式 `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `productshop` (`productId`),
  ADD CONSTRAINT `orderitems_ibfk_3` FOREIGN KEY (`orderId`) REFERENCES `orders` (`Id`);

--
-- 資料表的限制式 `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `members` (`memberId`);

--
-- 資料表的限制式 `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

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

