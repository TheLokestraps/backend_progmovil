const HomeController = () => {
  const index = (req, res, next) => {
    try {
      res.render('home', { title: 'Express' });
    } catch (error) {
      next(error);
    }
  };

  return { index };
};

export default HomeController;