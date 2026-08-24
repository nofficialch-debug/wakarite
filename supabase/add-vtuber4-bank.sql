alter table quizzes
  drop constraint if exists quizzes_bank_type_check;

alter table quizzes
  add constraint quizzes_bank_type_check
  check (
    bank_type in (
      'standard',
      'vtuber',
      'vtuber4',
      'private',
      'ultimate',
      'otaku_oshikatsu',
      'oshikatsu',
      'moshimo',
      'renai',
      'ura',
      'food',
      'school',
      'work',
      'smartphone',
      'money'
    )
  );
