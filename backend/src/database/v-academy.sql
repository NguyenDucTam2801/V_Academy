-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2024 at 01:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `v-academy`
--
-- --------------------------------------------------------
--
-- Table structure for table `amission`
--
CREATE TABLE
  `amission` (
    `amission_id` varchar(50) NOT NULL,
    `amission_name` varchar(50) NOT NULL,
    `amission_birth` date NOT NULL,
    `amission_email` varchar(50) NOT NULL,
    `amission_phone` varchar(12) NOT NULL,
    `amission_address` varchar(50) NOT NULL,
    `amission_url` varchar(50) DEFAULT NULL,
    `amission_region` varchar(50) DEFAULT NULL,
    `isActivation` tinyint (3) UNSIGNED NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `amission`
--
INSERT INTO
  `amission` (
    `amission_id`,
    `amission_name`,
    `amission_birth`,
    `amission_email`,
    `amission_phone`,
    `amission_address`,
    `amission_url`,
    `amission_region`,
    `isActivation`
  )
VALUES
  (
    'ami_001',
    'Chloe Adams',
    '1980-09-10',
    'chloe.adams@example.com',
    '3334445555',
    '202 Birch St.',
    NULL,
    'East Region',
    1
  ),
  (
    'ami_002',
    'David Green',
    '1982-11-22',
    'david.green@example.com',
    '4445556666',
    '303 Cedar St.',
    NULL,
    'West Region',
    1
  );

-- --------------------------------------------------------
--
-- Table structure for table `amission_account`
--
CREATE TABLE
  `amission_account` (
    `amission_id` varchar(50) NOT NULL,
    `amission_userName` varchar(50) NOT NULL,
    `amission_password` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `amission_account`
--
INSERT INTO
  `amission_account` (
    `amission_id`,
    `amission_userName`,
    `amission_password`
  )
VALUES
  ('ami_001', 'amission_chloe', 'adminpass1'),
  ('ami_002', 'amission_green', 'adminpass2');

-- --------------------------------------------------------
--
-- Table structure for table `class`
--
CREATE TABLE
  `class` (
    `class_id` varchar(50) NOT NULL,
    `class_name` varchar(45) NOT NULL,
    `class_numberOfLessons` int (10) UNSIGNED NOT NULL,
    `class_description` varchar(500) DEFAULT NULL,
    `subject_id` varchar(50) NOT NULL,
    `course_id` varchar(50) NOT NULL,
    `tutor_id` varchar(50) NOT NULL,
    `class_isFinished` tinyint (4) NOT NULL,
    `class_numberOfOccupiedClass` int (10) UNSIGNED NOT NULL,
    `student_id` varchar(50) NOT NULL,
    `amission_id` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `class`
--
INSERT INTO
  `class` (
    `class_id`,
    `class_name`,
    `class_numberOfLessons`,
    `class_description`,
    `subject_id`,
    `course_id`,
    `tutor_id`,
    `class_isFinished`,
    `class_numberOfOccupiedClass`,
    `student_id`,
    `amission_id`
  )
VALUES
  (
    'class_001',
    'Basic English Class 1',
    10,
    'Morning class for beginners',
    'eng_sub',
    'course_eng_001',
    'tut_001',
    0,
    5,
    'stu_001',
    'ami_001'
  ),
  (
    'class_002',
    'Advanced English Class 1',
    10,
    'Evening class for advanced learners',
    'eng_sub',
    'course_eng_002',
    'tut_002',
    0,
    3,
    'stu_002',
    'ami_002'
  );

-- --------------------------------------------------------
--
-- Table structure for table `class_lesson`
--
CREATE TABLE
  `class_lesson` (
    `class_id` varchar(50) NOT NULL,
    `lesson_id` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `class_lesson`
--
INSERT INTO
  `class_lesson` (`class_id`, `lesson_id`)
VALUES
  ('class_001', 'lesson_001'),
  ('class_001', 'lesson_002'),
  ('class_002', 'lesson_003'),
  ('class_002', 'lesson_004');

-- --------------------------------------------------------
--
-- Table structure for table `course`
--
CREATE TABLE
  `course` (
    `course_id` varchar(50) NOT NULL,
    `course_name` varchar(50) NOT NULL,
    `subject_id` varchar(50) NOT NULL,
    `course_descript` varchar(500) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `course`
--
INSERT INTO
  `course` (
    `course_id`,
    `course_name`,
    `subject_id`,
    `course_descript`
  )
VALUES
  (
    'course_eng_001',
    'English Basic',
    'eng_sub',
    'Basic course covering beginner-level English topics'
  ),
  (
    'course_eng_002',
    'English Advanced',
    'eng_sub',
    'Advanced course covering higher-level English topics'
  );

-- --------------------------------------------------------
--
-- Table structure for table `course_tutor`
--
CREATE TABLE
  `course_tutor` (
    `subject_id` varchar(50) NOT NULL,
    `tutor_id` varchar(50) NOT NULL,
    `course_id` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `course_tutor`
--
INSERT INTO
  `course_tutor` (`subject_id`, `tutor_id`, `course_id`)
VALUES
  ('eng_sub', 'tut_001', 'course_eng_001'),
  ('eng_sub', 'tut_002', 'course_eng_002');

-- --------------------------------------------------------
--
-- Table structure for table `lesson`
--
CREATE TABLE
  `lesson` (
    `lesson_id` varchar(50) NOT NULL,
    `lesson_topic` varchar(50) NOT NULL,
    `lesson_descript` varchar(50) NOT NULL,
    `lesson_note` varchar(50) DEFAULT NULL,
    `lesson_url` varchar(100) DEFAULT NULL,
    `lesson_startTime` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `lesson_endTime` datetime DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `lesson`
--
INSERT INTO
  `lesson` (
    `lesson_id`,
    `lesson_topic`,
    `lesson_descript`,
    `lesson_note`,
    `lesson_url`,
    `lesson_startTime`,
    `lesson_endTime`
  )
VALUES
  (
    'lesson_001',
    'Lesson 1: Basic Greetings',
    'Introduction to common greetings in English',
    NULL,
    'https://pwr.edu.zoom.us/j/13asdf55-aADF312',
    '2024-10-16 15:50:22',
    '2024-10-16 10:00:00'
  ),
  (
    'lesson_002',
    'Lesson 2: Basic Verbs',
    'Introduction to essential verbs in English',
    NULL,
    'https://pwr.edu.zoom.us/j/aisufhqn-fasdfkjq-46fd6dgh',
    '2024-10-16 15:50:50',
    '2024-10-17 10:00:00'
  ),
  (
    'lesson_003',
    'Lesson 1: Advanced Grammar',
    'In-depth look at complex grammatical structures',
    NULL,
    'https://pwr.edu.zoom.us/j/fauhooiqjp-sf32AF6543-agoqwga9',
    '2024-10-16 15:51:19',
    '2024-10-16 19:00:00'
  ),
  (
    'lesson_004',
    'Lesson 2: Advanced Vocabulary',
    'Study of advanced vocabulary in context',
    NULL,
    'https://pwr.edu.zoom.us/j/faiubiouawd-653asgAFsg-ioanpow6JH',
    '2024-10-16 15:51:44',
    '2024-10-17 19:00:00'
  );

-- --------------------------------------------------------
--
-- Table structure for table `student`
--
CREATE TABLE
  `student` (
    `student_id` varchar(50) NOT NULL,
    `student_name` varchar(50) NOT NULL,
    `student_birth` date NOT NULL,
    `student_email` varchar(50) NOT NULL,
    `student_phone` varchar(12) NOT NULL,
    `student_address` varchar(50) NOT NULL,
    `student_url` varchar(50) DEFAULT NULL,
    `student_descript` varchar(100) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `student`
--
INSERT INTO
  `student` (
    `student_id`,
    `student_name`,
    `student_birth`,
    `student_email`,
    `student_phone`,
    `student_address`,
    `student_url`,
    `student_descript`
  )
VALUES
  (
    'stu_001',
    'John Doe',
    '2005-05-15',
    'john.doe@example.com',
    '1234567890',
    '123 Elm St.',
    NULL,
    'A diligent student'
  ),
  (
    'stu_002',
    'Jane Smith',
    '2004-12-30',
    'jane.smith@example.com',
    '0987654321',
    '456 Oak St.',
    NULL,
    'An eager learner'
  ),
  (
    'stu_004',
    'Michael Green',
    '2003-11-25',
    'michael.green@example.com',
    '5556667777',
    '321 Cedar St.',
    NULL,
    'New student in the academy'
  ),
  (
    'stu_005',
    'Michael Jackson',
    '2003-12-30',
    'michael.jackson@example.com',
    '5556668888',
    '300 Cedar St.',
    NULL,
    'New student in the academy 1'
  );

-- --------------------------------------------------------
--
-- Table structure for table `student_account`
--
CREATE TABLE
  `student_account` (
    `student_id` varchar(50) NOT NULL,
    `student_userName` varchar(50) NOT NULL,
    `student_password` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `student_account`
--
INSERT INTO
  `student_account` (
    `student_id`,
    `student_userName`,
    `student_password`
  )
VALUES
  ('stu_001', 'john_doe', 'password123'),
  ('stu_002', 'jane_smith', 'pass4567');

-- --------------------------------------------------------
--
-- Table structure for table `subject`
--
CREATE TABLE
  `subject` (
    `subject_id` varchar(50) NOT NULL,
    `subject_name` varchar(50) NOT NULL,
    `subject_descript` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--
INSERT INTO
  `subject` (`subject_id`, `subject_name`, `subject_descript`)
VALUES
  (
    'eng_sub',
    'English Basic',
    'English language course'
  );

-- --------------------------------------------------------
--
-- Table structure for table `tutor`
--
CREATE TABLE
  `tutor` (
    `tutor_id` varchar(50) NOT NULL,
    `tutor_name` varchar(50) NOT NULL,
    `tutor_birth` date NOT NULL,
    `tutor_email` varchar(50) NOT NULL,
    `tutor_phone` varchar(12) NOT NULL,
    `tutor_region` varchar(50) DEFAULT NULL,
    `tutor_address` varchar(50) NOT NULL,
    `tutor_url` varchar(100) DEFAULT NULL,
    `tutor_descript` varchar(500) DEFAULT NULL,
    `isActivation` tinyint (3) UNSIGNED NOT NULL,
    `subject_id` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `tutor`
--
INSERT INTO
  `tutor` (
    `tutor_id`,
    `tutor_name`,
    `tutor_birth`,
    `tutor_email`,
    `tutor_phone`,
    `tutor_region`,
    `tutor_address`,
    `tutor_url`,
    `tutor_descript`,
    `isActivation`,
    `subject_id`
  )
VALUES
  (
    'tut_001',
    'Alice Johnson',
    '1985-07-20',
    'alice.johnson@example.com',
    '1112223333',
    'North Region',
    '789 Pine St.',
    NULL,
    'Experienced English tutor',
    1,
    'eng_sub'
  ),
  (
    'tut_002',
    'Bob Brown',
    '1990-08-05',
    'bob.brown@example.com',
    '2223334444',
    'South Region',
    '101 Maple St.',
    NULL,
    'Specialized in advanced English',
    1,
    'eng_sub'
  );

-- --------------------------------------------------------
--
-- Table structure for table `tutor_account`
--
CREATE TABLE
  `tutor_account` (
    `tutor_id` varchar(50) NOT NULL,
    `tutor_userName` varchar(50) NOT NULL,
    `tutor_password` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `tutor_account`
--
INSERT INTO
  `tutor_account` (`tutor_id`, `tutor_userName`, `tutor_password`)
VALUES
  ('tut_001', 'prof_alice', 'teach2022'),
  ('tut_002', 'prof_bob', 'passwordABC');

--
-- Indexes for dumped tables
--
--
-- Indexes for table `amission`
--
ALTER TABLE `amission` ADD PRIMARY KEY (`amission_id`);

--
-- Indexes for table `amission_account`
--
ALTER TABLE `amission_account` ADD PRIMARY KEY (`amission_id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class` ADD PRIMARY KEY (`class_id`),
ADD KEY `fk_class_amission` (`amission_id`),
ADD KEY `fk_class_student` (`student_id`),
ADD KEY `fk_class_tutor` (`tutor_id`);

--
-- Indexes for table `class_lesson`
--
ALTER TABLE `class_lesson` ADD PRIMARY KEY (`class_id`, `lesson_id`),
ADD KEY `fk_class_lesson_lesson` (`lesson_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course` ADD PRIMARY KEY (`course_id`),
ADD KEY `fk_course_subject` (`subject_id`);

--
-- Indexes for table `course_tutor`
--
ALTER TABLE `course_tutor` ADD PRIMARY KEY (`subject_id`, `tutor_id`, `course_id`),
ADD KEY `fk_course_tutor_course` (`course_id`),
ADD KEY `fk_course_tutor_tutor` (`tutor_id`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson` ADD PRIMARY KEY (`lesson_id`),
ADD UNIQUE KEY `unique_lesson_url` (`lesson_url`);

--
-- Indexes for table `student`
--
ALTER TABLE `student` ADD PRIMARY KEY (`student_id`),
ADD UNIQUE KEY `stu_phone_UNIQUE` (`student_phone`),
ADD UNIQUE KEY `stu_email_UNIQUE` (`student_email`);

--
-- Indexes for table `student_account`
--
ALTER TABLE `student_account` ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject` ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor` ADD PRIMARY KEY (`tutor_id`),
ADD KEY `fk_tutor_subject` (`subject_id`);

--
-- Indexes for table `tutor_account`
--
ALTER TABLE `tutor_account` ADD PRIMARY KEY (`tutor_id`);

--
-- Constraints for dumped tables
--
--
-- Constraints for table `amission_account`
--
ALTER TABLE `amission_account` ADD CONSTRAINT `fk_amission_account_amission` FOREIGN KEY (`amission_id`) REFERENCES `amission` (`amission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `class`
--
ALTER TABLE `class` ADD CONSTRAINT `fk_class_amission` FOREIGN KEY (`amission_id`) REFERENCES `amission` (`amission_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `fk_class_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `fk_class_tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_lesson`
--
ALTER TABLE `class_lesson` ADD CONSTRAINT `fk_class_lesson_class` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_class_lesson_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `course`
--
ALTER TABLE `course` ADD CONSTRAINT `fk_course_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `course_tutor`
--
ALTER TABLE `course_tutor` ADD CONSTRAINT `fk_course_tutor_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
ADD CONSTRAINT `fk_course_tutor_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`),
ADD CONSTRAINT `fk_course_tutor_tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_account`
--
ALTER TABLE `student_account` ADD CONSTRAINT `fk_student_account_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tutor`
--
ALTER TABLE `tutor` ADD CONSTRAINT `fk_tutor_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tutor_account`
--
ALTER TABLE `tutor_account` ADD CONSTRAINT `fk_tutor_account_tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;