INSERT INTO `setu`.`pictures` (
    create_by,
    create_time,
    edit_by,
    edit_time,
    picture_dir,
    picture_id,
    thumb_dir
  )
VALUES
  (
    1,
    1581497585,
    1,
    1581497585,
    'src/favicon.png',
    1,
    'src/favicon.png'
  );
  INSERT INTO `setu`.`tags` (create_by, picture_id, tag, tag_id)
  VALUES
    (
      1,
      1,
      '测试tag1',
      1
    );
    INSERT INTO `setu`.`tags` (create_by, picture_id, tag, tag_id)
    VALUES
      (
        1,
        1,
        '测试tag2',
        2
      );
INSERT INTO `setu`.`scores` (
    create_by,
    create_time,
    edit_by,
    edit_time,
    picture_id,
    score,
    score_id
  )
VALUES
  (
    1,
    1581497590,
    1,
    1581497590,
    1,
    '89',
    1
  );
INSERT INTO `setu`.`scores` (
    create_by,
    create_time,
    edit_by,
    edit_time,
    picture_id,
    score,
    score_id
  )
VALUES
  (
    1,
    1581497595,
    1,
    1581497595,
    1,
    '99',
    2
  );
INSERT INTO `setu`.`users` (
    create_time,
    edit_time,
    u_account,
    u_avatar,
    u_id,
    u_level,
    u_password
  )
VALUES
  (
    1581497570,
    1581497570,
    'yusa',
    'src/favicon.png',
    1,
    'admin',
    'password'
  );