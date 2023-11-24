import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import Post from '../components/Post';


function Profile({ match }) {
  const { users } = useSelector((state) => state.userReducer);
  const { posts } = useSelector((state) => state.postsReducer);
  const params = useParams();
  const user = users.find((obj) => obj._id == params.userid);
  const usersposts = posts.filter((obj) => obj.user._id == params.userid);
  const currentuser = JSON.parse(localStorage.getItem("user"));


  return (
    <DefaultLayout>
      {users.length > 0 && (
        <>
          <Row justify='center'>
            <Col lg={12} sm={24} xs={24}>
              <div className='m-5 profile'>
                <div className='d-flex align-items-center'>
                  {user.profilePicUrl == "" ? (
                    <p className="profile-pic">{user.username[0]}</p>
                  ) : (
                    <img src={user.profilePicUrl} height='100' width='100' className='img-curve mx-5' />
                  )}
                  <div className="text-left profile-info">
                    <p style={{ color: "black" }} id='profile-name'>{user.username}</p>
                    <p style={{ fontSize: 15 }} id='profile-date'>
                      {moment(user.createdAt).format("MMM DD yyyy")}
                    </p>

                    {currentuser._id == user._id && (
                      <Button>
                        <Link to="/editprofile" id='profile-button'>Edit profile</Link>
                      </Button>
                    )}
                  </div>
                </div>
                <p className='my-2'> Bio : {user.bio.length == 0 ? 'frontend developer' : user.bio}</p>
                <Button className='mx-2'>Followers : {user.followers.length}</Button>
                <Button className='mx-2'>Followers : {user.following.length}</Button>
                <p className='my-2'>Total posts : {usersposts.length}</p>
              </div>
            </Col>
          </Row>

          {(user.followers.find(obj => obj == currentuser._id) || user.privateAccount == false || user._id == currentuser._id) ?
            (<Row justify='center'>
              {usersposts.map(post => {
                return (
                  <Col lg={8} sm={24} xs={24}>
                    <Post post={post} postInProfilePage={true} />
                  </Col>
                )
              })}
            </Row>):(<p> This account is private. Follow to see posts.</p>)}
        </>)}
    </DefaultLayout>
  )
}

export default Profile
