const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{

    const tagData = await Tag.findAll({
      include: [
        {
          model: Product, through: ProductTag, as: 'tagged_products'
        },
      ],
    });
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

  

router.get('/:id', async(req, res) => {
  try {
    
    const tagData = await Tag.findByPk(req.params.id,{
      include: [
        {
          model: Product, through: ProductTag, as: 'tagged_products'
        },
      ],
    })
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    
    const{name}=req.body;
    const tagData = await Tag.create({
      tag_name: name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(tagData)
  }catch{
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
