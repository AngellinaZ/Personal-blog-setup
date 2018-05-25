<template>
  <section class="section-sidebar">
    <div class="sidebar-header">
      <div class="flex_cc logo">
        <img src="../assets/logo.png" alt="logo">
        <span>大鱼</span>
      </div>
      <ul class="flex_cc nav">
        <li v-for="(item,index) in navArr" @click="getCurr('nav',index)">
          <router-link :to="item.url" :class="{'active': currNav === index}">{{ item.name }}</router-link>
          <ul class="backstage" v-if="isLogin && item.name === '后台'">
            <li v-for="(bItem,bIndex) in item.items" @click="getCurr('nextNav',bIndex)">
              <router-link :to="bItem.url" :class="{'active': currNextNav === bIndex}">{{ bItem.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="flex_rc flex_wrap tag">
        <li v-for="(item,index) in tagArr" :class="{'active': currTag === index}" @click="getCurr('tag',index)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="sidebar-footer"></div>
  </section>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      currNav: '',
      currNextNav: '',
      currTag: '',
      navArr: [
        {'name': '首页', 'url': '/'},
        {'name': '大鱼', 'url': '#'},
        {'name': '其他', 'url': '#'},
        {
          'name': '后台', 
          'url': '/backstage', 
          'items': [
            {
              'name': '-文案',
              'url': '/markdown'
            },
            {
              'name': '-管理',
              'url': '/manage'
            }
          ]
        }
      ],
      tagArr: [],
      isLogin: ''
    }
  },
  mounted() {
    this.getTag();
    this.isLogin = localStorage.getItem('isLogin');
  },
  methods: {
    getCurr(t,i) {
      if (t === 'nav') {
        this.currNav = i;
      } else if (t === 'nextNav') {
        this.currNextNav = i;
      } else if (t === 'tag') {
        this.currTag = i;
      }
    },

    getTag () {
        this.$http({
            method: 'post',
            url: this.HOST + '/api/getTag',
            params: {}
        }).then(response => {
            var datas = response.data
            if (datas.code == 200) {
                this.tagArr = datas.data
            }
        }).catch(function(error) {
        })
    },
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .section-sidebar{
    width: 16rem;
    padding: 1.5rem;
    color: #999;
    background: #fff;

    .logo {
      height: 14rem;
      border-bottom: 1px solid #CFCFCF;

      span {
        font-size: 14px;
        margin-top: 1.5rem;
      }
      img {
        height: 4.5rem;
        border-radius: 50%;
        widtd: 4.5rem;
      }
    }
    .nav {
      color: #666;
      border-bottom: 1px solid #CFCFCF;
      padding: 1.5rem 0;
      padding-top: 1rem;

      li {
        font-size: 14px;
        margin-top: 1rem;
      }
      .active {
        color: #7AC5CD;
      }
    }
    .sidebar-header {
      flex: 3;
    }
    .sidebar-footer {
      flex: 1;
      background: blue;
    }
    .tag {
      padding-top: 1rem;

      li {
        margin-right: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.2rem 0.5rem;
        border: 1px solid #999;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
      }
      .active {
        background: #7AC5CD;
        color: #fff;
        border-color: #7AC5CD;

        a {
          color: #fff;
        }
      }
    }
    .backstage {
      margin-left: 1.5rem;
    }
  }
</style>
