/*
 * http
 */

const name = 'HTTPFile'

const version = '1.0'

const protocols = ['http']

module.exports = ({wrapReadableStream , request}) => {

  const file = (id)=>{
    return {
      id,
      name:id.split('/').pop(),
      ext: id.split('.').pop(),
      url: `http:${id}`,
      protocol:'http',
    }
  }

  const folder = file

  const getFileSize = async (url , headers) => {
    let nh = await request.header(url , {headers})
    if(nh && nh['content-length']){
      return nh['content-length']
    }else{
      return null
    }
  }

  const createReadStream = async ({id , options = {}} = {}) => {
    let url = `http:${id}`
    let size = await getFileSize(url)
    let readstream = request({url, method:'get'})
    return wrapReadableStream(readstream , { size: r.size } )
  }

  return { name , version , drive:{ protocols , folder , file , createReadStream , mountable : false } }
}