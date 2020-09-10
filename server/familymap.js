/* family map? */

family = new Map();
family.set('0', 'Child');
family.set('1', 'Parent');
family.set('2', 'Parent');
family.set('3', 'Spouse');
family.set('00', 'Grandchild');
family.set('01', 'Spouse');
family.set('02', 'Spouse');
family.set('03', 'Daughter / Son in Law');
family.set('10', 'Brother/Sister');
family.set('11', 'Grandparent (Paternal)');
family.set('12', 'Grandparent (Paternal)');
family.set('13', 'Parent'); // Probably recursive and never will occour
family.set('20', 'Brother/Sister');
family.set('21', 'Grandparent (Maternal)');
family.set('22', 'Grandparent (Maternal)');
family.set('23', 'Parent'); // Probably recursive and never will occour
family.set('30', 'Child'); // Step?
family.set('31', 'Parent in Law');
family.set('32', 'Parent in Law');
family.set('33', 'You???'); // Probably recursive and never will occour
family.set('000', 'Great Grandchild');
family.set('001', 'Grandchild(?)');
family.set('002', 'Grandchild(?)');
family.set('003', 'Great Grandchild in Law');
family.set('010', 'Child'); // Step?
family.set('011', 'Parent in Law (Paternal)');
family.set('012', 'Parent in Law (Paternal)');
family.set('013', 'Aunt/Uncle in Law (?)');
family.set('020', 'Child'); // Step?
family.set('021', 'Parent in Law (Maternal)');
family.set('022', 'Parent in Law (Maternal)');
family.set('023', '');
family.set('030', 'Grandchild'); // Step?
family.set('031', 'in Law');
family.set('032', 'in Law');
family.set('033', '');
family.set('100', 'Niece/Nephew');
family.set('101', 'Parent'); // Step?
family.set('102', 'Parent'); // Step?
family.set('103', 'Brother/Sister in Law');
family.set('110', 'Aunt/Uncle (Paternal)');
family.set('111', 'Great (Paternal) Grandparent (Paternal)');
family.set('112', 'Great (Paternal) Grandparent (Paternal)');
family.set('113', 'Grandparent (Paternal)');
family.set('120', 'Aunt/Uncle (Paternal)');
family.set('121', 'Great (Maternal) Grandparent (Paternal)');
family.set('122', 'Great (Maternal) Grandparent (Paternal)');
family.set('123', 'Great (Maternal) Grandparent (Paternal)');
family.set('130', 'Brother/Sister');
family.set('131', 'Grandparent (Maternal)'); // 131 => 21
family.set('132', 'Grandparent (Maternal)'); // 132 => 22
family.set('133', 'Grandparent (Paternal)'); // ?? IM CONFUSED
family.set('200', 'Niece/Nephew');
family.set('201', ''); //
family.set('202', ''); //
family.set('203', 'Brother/Sister in Law'); // Brother/Sister's father, mother, spouse => father, mother, Brother/Sister in law?
family.set('210', 'Aunt/Uncle (Maternal)');
family.set('211', 'Great (Paternal) Grandparent (Maternal)');
family.set('212', 'Great (Paternal) Grandparent (Maternal)');
family.set('213', 'Great (Paternal) Grandparent (Maternal)');
family.set('220', 'Aunt/Uncle (Maternal)');
family.set('221', 'Great (Maternal) Grandparent (Maternal)');
family.set('222', 'Great (Maternal) Grandparent (Maternal)');
family.set('223', 'Great (Maternal) Grandparent (Maternal)');
family.set('230', 'Brother/Sister'); // Loopy
family.set('231', 'Grandparent'); // Loopy
family.set('232', 'Grandparent'); // Loopy
family.set('233', 'Parent'); // Loopy
family.set('300', 'Grandchild');
family.set('301', 'Father'); // Loopy
family.set('302', 'Mother'); // Loopy
family.set('303', 'Child in Law');
family.set('310', 'Brother/Sister in Law');
family.set('311', 'Grandparent (Paternal) in Law');
family.set('312', 'Grandparent (Paternal) in law');
family.set('313', 'Grandparent (Paternal) in law');
family.set('320', 'Brother/Sister in Law');
family.set('321', 'Grandparent (Maternal) in Law');
family.set('322', 'Grandparent (Maternal) in Law');
family.set('323', 'Grandparent (Maternal) in Law');
family.set('330', 'Child'); // Loopy
family.set('331', 'Parent'); // Loopy
family.set('332', 'Parent'); // Loopy
family.set('333', 'Spouse'); // Loopy
/* Incomplete List of Paths */
/* Four */
family.set('0110', 'Brother/Sister in Law');
family.set('1100', 'Cousin (Paternal)');
family.set('1103', 'Aunt/Uncle (Paternal)');
family.set('1110', 'Grandparent (Extended) (Paternal)');
family.set('1200', 'Cousin (Paternal)');
family.set('2100', 'Cousin (Maternal)');
family.set('2200', 'Cousin (Maternal)');
family.set('3110', 'Aunt/Uncle in Law');
/* Five */
family.set('01100', 'Niece/Nephew in Law');
family.set('11001', 'Niece/Nephew (Extended) (Paternal)');
family.set('11003', 'Cousin (Extended) (Paternal)');
family.set('11100', 'Aunt/Uncle (Extended) (Paternal)');
family.set('11103', 'Grandparent (Extended) (Paternal)');
family.set('12002', 'Aunt/Uncle (Extended) (Paternal)');
family.set('31100', 'Brother/Sister (Extended) in Law');
/* Six */
family.set('110031', 'Aunt/Uncle (Extended) (Paternal)');
family.set('111000', 'Cousin (Extended) (Paternal)');
family.set('111003', 'Aunt/Uncle (Extended) (Paternal)');
family.set('111031', 'Great Grandparent (Extended) (Paternal)');
family.set('120022', 'Grandparent (Extended) (Paternal)');
family.set('311000', 'Niece/Nephew (Extended) in Law');
/* Seven */
family.set('1100310', 'Cousin (Extended) (Paternal)');
family.set('1110310', 'Grandparent (Extended) (Paternal)');
/* Eight */
family.set('11103100', 'Aunt/Uncle (Extended) (Paternal)');
family.set('11103103', 'Grandparent (Extended) (Paternal)');

module.exports = family;
