-- Add sample courses data
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  provider text NOT NULL,
  duration text,
  price decimal(10,2),
  rating decimal(3,2),
  level text CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  category text,
  skills text[],
  url text,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policy for courses (readable by everyone)
CREATE POLICY "Courses are viewable by everyone" 
ON public.courses 
FOR SELECT 
USING (true);

-- Add skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  category text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on skills
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create policy for skills
CREATE POLICY "Skills are viewable by everyone" 
ON public.skills 
FOR SELECT 
USING (true);

-- Add user_skills junction table
CREATE TABLE IF NOT EXISTS public.user_skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  skill_id uuid REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_level text CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Enable RLS on user_skills
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

-- Create policies for user_skills
CREATE POLICY "Users can view their own skills" 
ON public.user_skills 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own skills" 
ON public.user_skills 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills" 
ON public.user_skills 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills" 
ON public.user_skills 
FOR DELETE 
USING (auth.uid() = user_id);

-- Insert sample courses
INSERT INTO public.courses (title, description, provider, duration, price, rating, level, category, skills, url, image_url) VALUES
('Complete Web Development Bootcamp', 'Learn HTML, CSS, JavaScript, React, Node.js and more', 'Udemy', '65 hours', 89.99, 4.7, 'Beginner', 'Web Development', ARRAY['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'], 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', 'https://img-c.udemycdn.com/course/750x422/1565838_e54e_16.jpg'),

('JavaScript: The Complete Guide', 'Modern JavaScript from the beginning - all the way to advanced topics', 'Udemy', '52 hours', 79.99, 4.6, 'Intermediate', 'Programming', ARRAY['JavaScript', 'ES6', 'DOM', 'Async Programming'], 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/', 'https://img-c.udemycdn.com/course/750x422/2508942_11d3_3.jpg'),

('React - The Complete Guide', 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!', 'Udemy', '48 hours', 94.99, 4.6, 'Intermediate', 'Frontend', ARRAY['React', 'Redux', 'Hooks', 'Next.js'], 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', 'https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg'),

('Python for Data Science and Machine Learning', 'Learn how to use NumPy, Pandas, Seaborn , Matplotlib , Plotly , Scikit-Learn , Machine Learning, Tensorflow , and more!', 'Udemy', '25 hours', 84.99, 4.5, 'Intermediate', 'Data Science', ARRAY['Python', 'NumPy', 'Pandas', 'Machine Learning', 'TensorFlow'], 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/', 'https://img-c.udemycdn.com/course/750x422/903744_8eb2.jpg'),

('AWS Certified Solutions Architect', 'Learn Amazon Web Services (AWS) and pass the AWS Certified Solutions Architect Associate Exam!', 'Udemy', '26 hours', 74.99, 4.5, 'Advanced', 'Cloud Computing', ARRAY['AWS', 'Cloud Architecture', 'EC2', 'S3', 'RDS'], 'https://www.udemy.com/course/aws-certified-solutions-architect-associate/', 'https://img-c.udemycdn.com/course/750x422/362070_b9a1_10.jpg'),

('Complete Node.js Developer Course', 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!', 'Udemy', '35 hours', 89.99, 4.7, 'Intermediate', 'Backend', ARRAY['Node.js', 'Express', 'MongoDB', 'REST API'], 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/', 'https://img-c.udemycdn.com/course/750x422/922484_52a1_8.jpg'),

('Machine Learning A-Z', 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts', 'Udemy', '44 hours', 94.99, 4.5, 'Beginner', 'Machine Learning', ARRAY['Python', 'R', 'Machine Learning', 'Data Analysis'], 'https://www.udemy.com/course/machinelearning/', 'https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg'),

('iOS App Development Bootcamp', 'From Beginner to iOS App Developer with just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!', 'Udemy', '60 hours', 89.99, 4.6, 'Beginner', 'Mobile Development', ARRAY['Swift', 'iOS', 'Xcode', 'SwiftUI'], 'https://www.udemy.com/course/ios-13-app-development-bootcamp/', 'https://img-c.udemycdn.com/course/750x422/1778502_f4b9_12.jpg'),

('Complete Flutter Development Bootcamp', 'Build native iOS and Android apps using Flutter and Dart programming language', 'Udemy', '31 hours', 84.99, 4.5, 'Intermediate', 'Mobile Development', ARRAY['Flutter', 'Dart', 'Mobile Development', 'iOS', 'Android'], 'https://www.udemy.com/course/flutter-bootcamp-with-dart/', 'https://img-c.udemycdn.com/course/750x422/2259120_9e3b_6.jpg'),

('Data Structures and Algorithms', 'Master the fundamentals of data structures and algorithms to improve your programming skills', 'Coursera', '40 hours', 49.99, 4.4, 'Intermediate', 'Computer Science', ARRAY['Data Structures', 'Algorithms', 'Problem Solving'], 'https://www.coursera.org/specializations/data-structures-algorithms', 'https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/QMjOlW8FEee5Rg7DPaXqhA_5c6b0c70b8bf11e8b83fa11ee810c36f_Data-structures-and-algorithms.png');

-- Insert sample skills
INSERT INTO public.skills (name, category) VALUES
('JavaScript', 'Programming'),
('Python', 'Programming'),
('React', 'Frontend'),
('Node.js', 'Backend'),
('HTML', 'Frontend'),
('CSS', 'Frontend'),
('SQL', 'Database'),
('MongoDB', 'Database'),
('AWS', 'Cloud'),
('Docker', 'DevOps'),
('Git', 'Version Control'),
('Machine Learning', 'AI/ML'),
('Data Analysis', 'Data Science'),
('UI/UX Design', 'Design'),
('Project Management', 'Management');

-- Create trigger for updated_at on courses
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update profiles table to include more fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS skills text[],
ADD COLUMN IF NOT EXISTS experience_level text,
ADD COLUMN IF NOT EXISTS current_role text,
ADD COLUMN IF NOT EXISTS target_role text,
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS github_url text;