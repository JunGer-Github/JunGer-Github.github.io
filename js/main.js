function MusicColor() {
    var lis = document.querySelectorAll(".main-music li")
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute("index", i)
    }
}
var app = new Vue({
    el: '#app',
    data: {
        count: '',
        MusicList: [],
        MusicUrl: '',
        title: '',
        isclass: false,
        hotComments: []
    },
    methods: {
        render: function() {

        },
        search: function() {
            var than = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.count)
                .then(function(response) {
                    // console.log(response.data.result.songs);
                    than.MusicList = response.data.result.songs
                }, function(error) {
                    console.log(error);
                })

        },
        //http://musicapi.leanapp.cn/comment/music?id=
        // https://autumnfish.cn/comment/music?id=
        PlayMusic: function(item, MusicId) {
            this.title = item.name + "-" + item.artists[0].name
            this.MusicUrl = "https://music.163.com/song/media/outer/url?id=" + MusicId + ".mp3"
            MusicColor()
            var that = this
            axios.get("https://autumnfish.cn/comment/music?id=" + MusicId + "&limit=1")
                .then(function(response) {
                    that.hotComments = response.data.hotComments
                }),
                function(error) {}
        },
        Playon: function() {
            this.isclass = true

        },
        Pauseon: function() {
            this.isclass = false
        }
    }
})