<button onclick="test(event)">
    <x-svg.upvote-svg />
</button>

<script>
    function test(e) {
        e.stopPropagation()
        console.log(2)
    }
</script>
