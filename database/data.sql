-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

 insert into "plans"
   ("name", "description", "planType", "pricePerMonth")
   values
     ('Free Plan', 'Free plan that includes one free message sent
     to child upon death', 'free', 0 ),
     ('Paid Plan', 'Paid plan that includes message and gifts
     sent to child upon death' , 'paid', 4000);

insert into "donorPlans"
    ("name", "description", "planType", "price")
    values
      ('Silver Plan', 'Minimum Donation that will provide a paid Plan to
      a Parent experiencing financial hardship ', 'silver', 10000  ),
      ('Gold Plan', 'Premium Donation that will provide a paid plan with gift
      included to a parent experiencing financial hardship', 'gold', 20000)
