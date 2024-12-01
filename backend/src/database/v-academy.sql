-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2024 at 04:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `v-academy`
--

-- --------------------------------------------------------

--
-- Table structure for table `admission`
--

CREATE TABLE `admission` (
  `admission_id` int(255) NOT NULL,
  `admission_name` varchar(50) NOT NULL,
  `admission_birth` date NOT NULL,
  `admission_email` varchar(50) NOT NULL,
  `admission_phone` varchar(12) NOT NULL,
  `admission_address` varchar(50) NOT NULL,
  `admission_url` varchar(50) DEFAULT NULL,
  `admission_region` varchar(50) DEFAULT NULL,
  `isActivation` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admission`
--

INSERT INTO `admission` (`admission_id`, `admission_name`, `admission_birth`, `admission_email`, `admission_phone`, `admission_address`, `admission_url`, `admission_region`, `isActivation`) VALUES
(1, 'Chloe Adams', '1980-09-10', 'chloe.adams@example.com', '3334445555', '202 Birch St.', NULL, 'East Region', 1),
(2, 'David Green', '1982-11-22', 'david.green@example.com', '4445556666', '303 Cedar St.', NULL, 'West Region', 1);

-- --------------------------------------------------------

--
-- Table structure for table `admission_account`
--

CREATE TABLE `admission_account` (
  `admission_userName` varchar(50) NOT NULL,
  `admission_password` varchar(100) NOT NULL,
  `admission_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admission_account`
--

INSERT INTO `admission_account` (`admission_userName`, `admission_password`, `admission_id`) VALUES
('admission_chloe', '$2a$10$jwHzWVM0vygKGMLfGcJIPeoWx3q7lEbe1y9xqAxLT9lvPnNAGYi86', 1),
('admission_green', 'adminpass2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_id` int(255) NOT NULL,
  `class_name` varchar(45) NOT NULL,
  `class_description` varchar(500) DEFAULT NULL,
  `course_id` varchar(50) NOT NULL,
  `tutor_id` int(255) DEFAULT NULL,
  `student_id` int(255) DEFAULT NULL,
  `admission_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `class_name`, `class_description`, `course_id`, `tutor_id`, `student_id`, `admission_id`) VALUES
(1, 'Basic English Class 1', 'Morning class for beginners', 'course_eng_001', 1, 2, 1),
(2, 'Advanced English Class 1', 'Evening class for advanced learners', 'course_eng_002', 2, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `class_lesson`
--

CREATE TABLE `class_lesson` (
  `class_id` int(255) NOT NULL,
  `lesson_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_lesson`
--

INSERT INTO `class_lesson` (`class_id`, `lesson_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(50) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `subject_id` varchar(50) NOT NULL,
  `course_descript` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `subject_id`, `course_descript`) VALUES
('course_eng_001', 'English Basic', 'eng_sub', 'Basic course covering beginner-level English topics'),
('course_eng_002', 'English Advanced', 'eng_sub', 'Advanced course covering higher-level English topics');

-- --------------------------------------------------------

--
-- Table structure for table `course_tutor`
--

CREATE TABLE `course_tutor` (
  `tutor_id` int(255) DEFAULT NULL,
  `course_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_tutor`
--

INSERT INTO `course_tutor` (`tutor_id`, `course_id`) VALUES
(1, 'course_eng_001'),
(2, 'course_eng_002');

-- --------------------------------------------------------

--
-- Table structure for table `customer_contact`
--

CREATE TABLE `customer_contact` (
  `customer_id` int(255) NOT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `customer_email` varchar(100) DEFAULT NULL,
  `customer_phone` varchar(13) NOT NULL,
  `customer_address` varchar(100) DEFAULT NULL,
  `customer_birthday` date DEFAULT NULL,
  `customer_extra` varchar(500) DEFAULT NULL,
  `customer_status` enum('TO DO','IN PROCESS','FINISHED') NOT NULL DEFAULT 'TO DO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_contact`
--

INSERT INTO `customer_contact` (`customer_id`, `customer_name`, `customer_email`, `customer_phone`, `customer_address`, `customer_birthday`, `customer_extra`, `customer_status`) VALUES
(1, 'Tam', 'example@gmail.com', '01234567892', 'asdlfbsvn', '2024-11-07', NULL, 'IN PROCESS'),
(2, 'Nguyen Duc Tam', 'ex@ex.com', '987654321', 'asfioianvl', '2001-12-19', NULL, 'TO DO');

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `lesson_id` int(255) NOT NULL,
  `lesson_topic` varchar(50) NOT NULL,
  `lesson_descript` varchar(50) NOT NULL,
  `lesson_note` varchar(50) DEFAULT NULL,
  `lesson_url` varchar(100) DEFAULT NULL,
  `lesson_startTime` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lesson_endTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`lesson_id`, `lesson_topic`, `lesson_descript`, `lesson_note`, `lesson_url`, `lesson_startTime`, `lesson_endTime`) VALUES
(1, 'Lesson 1: Basic Greetings', 'Introduction to common greetings in English', NULL, 'https://pwr.edu.zoom.us/j/13asdf55-aADF312', '2024-10-16 15:50:22', '2024-10-16 10:00:00'),
(2, 'Lesson 2: Basic Verbs', 'Introduction to essential verbs in English', NULL, 'https://pwr.edu.zoom.us/j/aisufhqn-fasdfkjq-46fd6dgh', '2024-10-16 15:50:50', '2024-10-17 10:00:00'),
(3, 'Lesson 1: Advanced Grammar', 'In-depth look at complex grammatical structures', NULL, 'https://pwr.edu.zoom.us/j/fauhooiqjp-sf32AF6543-agoqwga9', '2024-10-16 15:51:19', '2024-10-16 19:00:00'),
(4, 'Lesson 2: Advanced Vocabulary', 'Study of advanced vocabulary in context', NULL, 'https://pwr.edu.zoom.us/j/faiubiouawd-653asgAFsg-ioanpow6JH', '2024-10-16 15:51:44', '2024-10-17 19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(255) NOT NULL,
  `student_name` varchar(50) NOT NULL,
  `student_birth` date NOT NULL,
  `student_email` varchar(50) NOT NULL,
  `student_phone` varchar(12) NOT NULL,
  `student_address` varchar(50) NOT NULL,
  `student_url` varchar(50) DEFAULT NULL,
  `student_descript` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_name`, `student_birth`, `student_email`, `student_phone`, `student_address`, `student_url`, `student_descript`) VALUES
(1, 'John Doe', '2005-05-15', 'john.doe@example.com', '1234567890', '123 Elm St.', NULL, 'A diligent student'),
(2, 'Jane Smith', '2004-12-30', 'jane.smith@example.com', '0987654321', '456 Oak St.', NULL, 'An eager learner'),
(3, 'Michael Green', '2003-11-25', 'michael.green@example.com', '5556667777', '321 Cedar St.', NULL, 'New student in the academy'),
(4, 'Michael Jackson', '2003-12-30', 'michael.jackson@example.com', '5556668888', '300 Cedar St.', NULL, 'New student in the academy 1');

-- --------------------------------------------------------

--
-- Table structure for table `student_account`
--

CREATE TABLE `student_account` (
  `student_id` int(255) NOT NULL,
  `student_userName` varchar(50) NOT NULL,
  `student_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_account`
--

INSERT INTO `student_account` (`student_id`, `student_userName`, `student_password`) VALUES
(1, 'john_doe@example.com', '$2a$10$07fCE7yUrPTTFlSJg83Lj.fjPEM2Re1..S98sVkfzScHyeWOWIR8q'),
(2, 'jane_smith@example.com', 'pass4567');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subject_id` varchar(50) NOT NULL,
  `subject_name` varchar(50) NOT NULL,
  `subject_descript` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject_id`, `subject_name`, `subject_descript`) VALUES
('eng_sub', 'English Basic', 'English language course');

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `tutor_id` int(255) NOT NULL,
  `tutor_name` varchar(50) NOT NULL,
  `tutor_birth` date NOT NULL,
  `tutor_email` varchar(50) NOT NULL,
  `tutor_phone` varchar(12) NOT NULL,
  `tutor_region` varchar(50) DEFAULT NULL,
  `tutor_address` varchar(50) NOT NULL,
  `tutor_url` varchar(100) DEFAULT NULL,
  `tutor_descript` varchar(500) DEFAULT NULL,
  `isActivation` tinyint(3) UNSIGNED NOT NULL,
  `subject_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`tutor_id`, `tutor_name`, `tutor_birth`, `tutor_email`, `tutor_phone`, `tutor_region`, `tutor_address`, `tutor_url`, `tutor_descript`, `isActivation`, `subject_id`) VALUES
(1, 'Alice Johnson', '1985-07-20', 'alice.johnson@example.com', '1112223333', 'North Region', '789 Pine St.', NULL, 'Experienced English tutor', 1, 'eng_sub'),
(2, 'Bob Brown', '1990-08-05', 'bob.brown@example.com', '2223334444', 'South Region', '101 Maple St.', NULL, 'Specialized in advanced English', 1, 'eng_sub');

-- --------------------------------------------------------

--
-- Table structure for table `tutor_account`
--

CREATE TABLE `tutor_account` (
  `tutor_id` int(255) NOT NULL,
  `tutor_userName` varchar(50) NOT NULL,
  `tutor_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutor_account`
--

INSERT INTO `tutor_account` (`tutor_id`, `tutor_userName`, `tutor_password`) VALUES
(1, 'prof_alice', 'teach2022'),
(2, 'prof_bob', 'passwordABC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admission`
--
ALTER TABLE `admission`
  ADD PRIMARY KEY (`admission_id`);

--
-- Indexes for table `admission_account`
--
ALTER TABLE `admission_account`
  ADD PRIMARY KEY (`admission_id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `fk_class_admission` (`admission_id`),
  ADD KEY `fk_class_student` (`student_id`),
  ADD KEY `fk_class_tutor` (`tutor_id`),
  ADD KEY `course_id_fk` (`course_id`);

--
-- Indexes for table `class_lesson`
--
ALTER TABLE `class_lesson`
  ADD PRIMARY KEY (`class_id`,`lesson_id`),
  ADD KEY `id_lesson_fk` (`lesson_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `fk_course_subject` (`subject_id`);

--
-- Indexes for table `course_tutor`
--
ALTER TABLE `course_tutor`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `course_tutor_tutor_fk` (`tutor_id`);

--
-- Indexes for table `customer_contact`
--
ALTER TABLE `customer_contact`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`lesson_id`),
  ADD UNIQUE KEY `unique_lesson_url` (`lesson_url`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `stu_phone_UNIQUE` (`student_phone`),
  ADD UNIQUE KEY `stu_email_UNIQUE` (`student_email`);

--
-- Indexes for table `student_account`
--
ALTER TABLE `student_account`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`tutor_id`),
  ADD UNIQUE KEY `tutor_email` (`tutor_email`,`tutor_phone`),
  ADD KEY `fk_tutor_subject` (`subject_id`);

--
-- Indexes for table `tutor_account`
--
ALTER TABLE `tutor_account`
  ADD PRIMARY KEY (`tutor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admission`
--
ALTER TABLE `admission`
  MODIFY `admission_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admission_account`
--
ALTER TABLE `admission_account`
  MODIFY `admission_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `class_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer_contact`
--
ALTER TABLE `customer_contact`
  MODIFY `customer_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `lesson_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_account`
--
ALTER TABLE `student_account`
  MODIFY `student_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tutor`
--
ALTER TABLE `tutor`
  MODIFY `tutor_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tutor_account`
--
ALTER TABLE `tutor_account`
  MODIFY `tutor_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admission_account`
--
ALTER TABLE `admission_account`
  ADD CONSTRAINT `fk_admission_account_admission` FOREIGN KEY (`admission_id`) REFERENCES `admission` (`admission_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `admission_id_fk` FOREIGN KEY (`admission_id`) REFERENCES `admission` (`admission_id`),
  ADD CONSTRAINT `course_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `tutot_id_fk` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`);

--
-- Constraints for table `class_lesson`
--
ALTER TABLE `class_lesson`
  ADD CONSTRAINT `id_class_fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_lesson_fk` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `fk_course_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `course_tutor`
--
ALTER TABLE `course_tutor`
  ADD CONSTRAINT `course_tutor_course_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `course_tutor_tutor_fk` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_account`
--
ALTER TABLE `student_account`
  ADD CONSTRAINT `fk_student_account_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tutor`
--
ALTER TABLE `tutor`
  ADD CONSTRAINT `fk_tutor_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tutor_account`
--
ALTER TABLE `tutor_account`
  ADD CONSTRAINT `tutor_id_fk` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`);
COMMIT;
DELIMITER $$
CREATE TRIGGER `set_end_time` BEFORE INSERT ON `lesson` FOR EACH ROW BEGIN
    -- Check if startTime is provided
    IF NEW.lesson_startTime IS NOT NULL THEN
        -- Add 1 hour to startTime and set it as endTime
        SET NEW.lesson_endTime = DATE_ADD(NEW.lesson_startTime, INTERVAL 1 HOUR);
    END IF;
END
$$
DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
